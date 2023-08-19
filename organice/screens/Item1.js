import db from "../config";

class Item {
    getAllItems = (callback) => {
        db.collection("Items")
            .get()
            .then((snapshot) => {
                const allItems = snapshot.docs.map((doc) => {
                    return { ...doc.data(), docId: doc.id };
                });
                callback(allItems);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    updateItem = (itemData, callback) => {
        const { docId, name, qty, measure, location } = itemData;

        db.collection("Items")
            .doc(docId)
            .update({
                Name: name,
                Qty: qty,
                measure: measure,
                location: location,
            })
            .then(() => {
                callback();
            })
            .catch((error) => {
                console.error("Error updating item:", error);
            });
    };

    addItem = (itemData, callback) => {
        db.collection("Items")
            .add({
                Name: itemData.name,
                Qty: itemData.qty,
                measure: itemData.measure,
                location: itemData.location,
            })
            .then(() => {
                callback();
            })
            .catch((error) => {
                console.error("Error adding item:", error);
            });
    };

    deleteItem = (docId, callback) => {
        db.collection("Items")
            .doc(docId)
            .delete()
            .then(() => {
                callback();
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            });
    }
}
export default new Item()