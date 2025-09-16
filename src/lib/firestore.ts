import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      firestoreId: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    throw error;
  }
};
