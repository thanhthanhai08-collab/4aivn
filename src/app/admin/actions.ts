'use server';

// Re-export the functions from the new location.
// This file now only acts as the "server action" boundary.
export { togglePostStatus, addOrUpdateItem } from '@/lib/admin-actions';
