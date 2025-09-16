import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { productsData } from "./products";

// const firebaseConfig = {
// apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
// projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
// appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBwZcpJ6PfbvPwQvm2ekn1y7s6fWFWp4uA",
  authDomain: "coderhouse-database-4a38a.firebaseapp.com",
  projectId: "coderhouse-database-4a38a",
  storageBucket: "coderhouse-database-4a38a.firebasestorage.app",
  messagingSenderId: "393120177874",
  appId: "1:393120177874:web:f7bdc315b2128bfa40d70b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadProducts = async (): Promise<void> => {
  try {
    console.log("🚀 Starting upload...");
    console.log(`📦 Total products to upload: ${productsData.length}`);

    const uploadPromises = productsData.map(
      async (product: ProductProps, index: number) => {
        try {
          await addDoc(collection(db, "products"), product);
          console.log(
            `✅ Uploaded product ${index + 1}/${productsData.length}: ${
              product.name
            }`
          );
          return { success: true, product: product.name };
        } catch (error) {
          console.error(`❌ Failed to upload ${product.name}:`, error);
          return { success: false, product: product.name, error };
        }
      }
    );

    const results = await Promise.all(uploadPromises);

    const successful = results.filter((result) => result.success).length;
    const failed = results.filter((result) => !result.success).length;

    console.log(`\n🎉 Upload completed!`);
    console.log(`✅ Successful uploads: ${successful}`);
    console.log(`❌ Failed uploads: ${failed}`);

    if (failed > 0) {
      console.log("\n❌ Failed products:");
      results
        .filter((result) => !result.success)
        .forEach((result) => {
          console.log(`   - ${result.product}`);
        });
    }

    process.exit(0);
  } catch (error) {
    console.error("💥 Fatal error during upload:", error);
    process.exit(1);
  }
};

uploadProducts();
