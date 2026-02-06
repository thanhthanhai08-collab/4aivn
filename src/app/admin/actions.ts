'use server';

import { togglePostStatus as logicTogglePostStatus, addOrUpdateItem as logicAddOrUpdateItem } from '@/lib/admin-actions';

export async function togglePostStatus(collectionName: string, docId: string, currentStatus: boolean) {
  return logicTogglePostStatus(collectionName, docId, currentStatus);
}

export async function addOrUpdateItem(collectionName: string, data: any, itemId?: string) {
  return logicAddOrUpdateItem(collectionName, data, itemId);
}
