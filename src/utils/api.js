// Maison Anima - Headless CMS & Cloud Sync API Layer
import {
  API_PRODUCT_LIST_DELAY_MS,
  API_PRODUCT_DETAIL_DELAY_MS,
  API_SYNC_DELAY_MS,
  API_RETRIEVE_DELAY_MS,
} from './constants';

const PRODUCTS_DATA = [
  {
    id: '1',
    name: 'Classic Silk Bandana',
    price: 495,
    image: '/assets/chain_pochette.png',
    meta: 'Equestrian Silk',
    category: 'Accessories',
    description: 'Elite craftsmanship in pure silk, screen-printed with historic equestrian motifs.'
  },
  {
    id: '2',
    name: 'Equestrian Riding Boots',
    price: 1450,
    image: '/assets/riding_boot.png',
    meta: 'Vintage Archive',
    category: 'Footwear',
    description: 'Premium refined leather designed with timeless lines, bringing historic equestrian boots into modern luxury wear.'
  },
  {
    id: '3',
    name: 'Bamboo Signature Tote',
    price: 3900,
    image: '/assets/bamboo_tote.png',
    meta: 'Maison Icons',
    category: 'Bags',
    description: 'Iconic curved bamboo handle paired with hand-grained Siena leather. An avant-garde silhouette crafted in Florence.'
  },
  {
    id: '4',
    name: 'Classic Horsebit Loafer',
    price: 890,
    image: '/assets/horsebit_loafer.png',
    meta: 'Vintage Archive',
    category: 'Footwear',
    description: 'The definitive leather loafer detailed with the double-ring equestrian horsebit. Crafted in soft-grained black calfskin.'
  },
  {
    id: '5',
    name: 'Leather Harness Waist Belt',
    price: 690,
    image: '/assets/saddle_belt.png',
    meta: 'Archival Collection',
    category: 'Accessories',
    description: 'Refined leather waist belt detailed with equestrian buckle attachments. Hand-curated signature accent for tailored looks.'
  }
];

export const MaisonCMS = {
  fetchProducts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...PRODUCTS_DATA]);
      }, API_PRODUCT_LIST_DELAY_MS);
    });
  },

  fetchProductById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = PRODUCTS_DATA.find((p) => p.id === id);
        if (product) {
          resolve({ ...product });
        } else {
          reject(new Error(`Product with ID ${id} not found in Maison registry.`));
        }
      }, API_PRODUCT_DETAIL_DELAY_MS);
    });
  }
};

export const MaisonCloudDB = {
  syncCart: async (cart, giftNote = '', giftWrapping = 'signature') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const syncToken = `ANIMA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        try {
          const remoteDB = JSON.parse(localStorage.getItem('maison_cloud_db') || '{}');
          remoteDB[syncToken] = {
            cart,
            giftNote,
            giftWrapping,
            syncedAt: new Date().toISOString()
          };
          localStorage.setItem('maison_cloud_db', JSON.stringify(remoteDB));
          resolve(syncToken);
        } catch (e) {
          console.error("Cloud DB Sync failed:", e);
          resolve(null);
        }
      }, API_SYNC_DELAY_MS);
    });
  },

  retrieveCart: async (syncToken) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const remoteDB = JSON.parse(localStorage.getItem('maison_cloud_db') || '{}');
          const record = remoteDB[syncToken.trim().toUpperCase()];
          if (record && record.cart) {
            resolve(record.cart);
          } else {
            reject(new Error("Invalid or expired Maison registry sync token."));
          }
        } catch {
          reject(new Error("Cloud DB retrieval failed."));
        }
      }, API_RETRIEVE_DELAY_MS);
    });
  }
};
