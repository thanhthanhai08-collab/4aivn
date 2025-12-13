/**
 * @fileoverview Cloud Functions for Firebase.
 */

const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const {defineSecret} = require("firebase-functions/params");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK to interact with other Firebase services
admin.initializeApp();
const db = admin.firestore();

// Define the secret key. The name 'GEMINI_API_KEY' must match the name you set
// when configuring the secret in Firebase.
const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");

/**
 * This Cloud Function is triggered on any change (create, update, delete)
 * to a document in the 'ratings' sub-collection of any document in the 'models' collection.
 * Example path: /models/{modelId}/ratings/{ratingId}
 */
exports.aggregateModelRating = onDocumentWritten(
  {
    document: "models/{modelId}/ratings/{ratingId}",
    secrets: [GEMINI_API_KEY],
  },
  async (event) => {
    const modelId = event.params.modelId;
    const modelRef = db.collection("models").doc(modelId);

    // Get the rating data before and after the change
    const ratingBefore = event.data?.before.data();
    const ratingAfter = event.data?.after.data();

    // Get the star rating values
    const newStars = ratingAfter ? (ratingAfter.starRating || 0) : 0;
    const oldStars = ratingBefore ? (ratingBefore.starRating || 0) : 0;

    const difference = newStars - oldStars;

    // If only the review text was updated without changing the star rating, no need to recalculate.
    if (difference === 0 && event.data?.before.exists && event.data?.after.exists) {
      console.log(`Rating updated for model ${modelId}, but starRating is unchanged.`);
      return null;
    }

    // Use a transaction to ensure data integrity during read and write operations
    try {
      await db.runTransaction(async (transaction) => {
        const modelDoc = await transaction.get(modelRef);

        if (!modelDoc.exists) {
          console.error(`Model document ${modelId} does not exist!`);
          return;
        }

        // Get the current aggregate values from the model's document
        const currentCount = modelDoc.data().ratingCount || 0;
        const currentTotalStars = modelDoc.data().totalStars || 0;

        let updatedCount;
        let updatedTotalStars;

        if (!event.data?.after.exists) {
          // Scenario: DELETE rating - Decrease count and total score
          updatedCount = currentCount - 1;
          updatedTotalStars = currentTotalStars - oldStars;
        } else if (!event.data?.before.exists) {
          // Scenario: CREATE new rating - Increase count and total score
          updatedCount = currentCount + 1;
          updatedTotalStars = currentTotalStars + newStars;
        } else {
          // Scenario: UPDATE rating - Keep count the same, only update total score
          updatedCount = currentCount;
          updatedTotalStars = currentTotalStars + difference;
        }

        // Ensure values are not negative
        updatedCount = updatedCount < 0 ? 0 : updatedCount;
        updatedTotalStars = updatedTotalStars < 0 ? 0 : updatedTotalStars;

        const averageRating = updatedCount > 0 ? (updatedTotalStars / updatedCount) : 0;

        // Update the aggregate fields in the model's document
        transaction.update(modelRef, {
          ratingCount: updatedCount,
          totalStars: updatedTotalStars,
          averageRating: parseFloat(averageRating.toFixed(2)), // Round to 2 decimal places
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      });

      console.log(`Successfully aggregated ratings for model: ${modelId}`);
    } catch (error) {
      console.error(`Failed to aggregate ratings for model ${modelId}:`, error);
      // You can add more robust error handling here, like sending a notification
    }
    return null;
  });
