// Maison Anima - Headless CMS & Cloud Sync API Layer

const PRODUCTS_DATA = [
  {
    id: '1',
    name: 'The Horsebit Chain Pochette',
    price: 2890,
    image: '/assets/chain_pochette.png',
    meta: 'Signature Line',
    category: 'Bags',
    description: 'Every stitch preserves a century of elite craftsmanship. Hand-curated selection honoring the equestrian heritage foundations.'
  },
  {
    id: '2',
    name: 'Equestrian Leather Riding Boot',
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
    name: 'GG Heritage Saddle Belt',
    price: 620,
    image: '/assets/saddle_belt.png',
    meta: 'Accessories',
    category: 'Accessories',
    description: 'Refined leather waist belt detailed with equestrian buckle attachments. Hand-curated signature accent for tailored looks.'
  }
];

export const MaisonCMS = {
  /**
   * Simulates fetching products dynamically from a headless CMS (like Sanity/Shopify)
   * with a loading latency of 1.2s.
   */
  fetchProducts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...PRODUCTS_DATA]);
      }, 1200);
    });
  },

  /**
   * Simulates fetching a single product detail by ID with 800ms delay.
   */
  fetchProductById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = PRODUCTS_DATA.find((p) => p.id === id);
        if (product) {
          resolve({ ...product });
        } else {
          reject(new Error(`Product with ID ${id} not found in Maison registry.`));
        }
      }, 800);
    });
  }
};

export const MaisonCloudDB = {
  /**
   * Simulates syncing shopping bag state to a cloud database (MongoDB/PostgreSQL).
   * Generates a unique sync token and persists it to a simulated remote database map in localStorage.
   */
  syncCart: async (cart) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const syncToken = `ANIMA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        try {
          // Simulate remote database table by storing in a separate localStorage entry
          const remoteDB = JSON.parse(localStorage.getItem('maison_cloud_db') || '{}');
          remoteDB[syncToken] = {
            cart,
            syncedAt: new Date().toISOString()
          };
          localStorage.setItem('maison_cloud_db', JSON.stringify(remoteDB));
          resolve(syncToken);
        } catch (e) {
          console.error("Cloud DB Sync failed:", e);
          resolve(null);
        }
      }, 1500); // Simulated network latency for DB insertion
    });
  },

  /**
   * Simulates retrieving shopping bag state from a cloud database using a sync token.
   */
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
      }, 1200); // Simulated query response time
    });
  }
};
