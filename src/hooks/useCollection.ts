import useAuth from "./useAuth";

const useCollection = () => {
  const { pb } = useAuth();
  // pb.cancelRequest("collection")

  const getSingleCollection = async (collection: string, recordId: string) => {
    try {
      return await pb.collection(collection).getOne(recordId);
    } catch (err) {
      return err;
    }
  };

  const addToCollection = async (collection: string, data: any) => {
    await pb.collection(collection).create(data, { '$cancelKey': "collection" });
  };

  const getCollectionList = async (collection: string) => {
    try {
      const res = await pb
        .collection(collection)
        // .getFullList(100, { $cancelKey: collection });
        .getFullList(100, { $autoCancel: false });
      return res;
    } catch (err) {
      return err;
    }
  };

  const getFilteredCollection = async (
    collection: string,
    userId: string
  ) => {
    try {
      return await pb
        .collection(collection)
        .getFirstListItem(`user="${userId}"`);
    } catch (err) {
      return err;
    }
  };

  const filterCollectionByUser = async (collection: string, userId: string) => {
    try {
      return await pb.collection(collection).getFullList(1000, {
        sort: "-created",
        filter: `user="${userId}"`,
        $autoCancel: false
      });
    } catch (err) {
      return err;
    }
  };

  const updateCollection = async (
    collection: string,
    RECORD_ID: string,
    data: any
  ) => {
    try {
      return await pb.collection(collection).update(RECORD_ID, data);
    } catch (err) {
      return err;
    }
  };

  const subsribeToCollection = (collection: string) => {
    const res = pb.collection(collection).subscribe("*", (data) => data.record);
    return res;
  };

  const subscribeToCollectionRecord = (
    collection: string,
    RECORD_ID: string
  ) => {
    const res = pb
      .collection(collection)
      .subscribe(RECORD_ID, (data) => data.record);
    return res;
  };

  const unSubscribeFromCollection = (collection: string) =>
    pb.collection(collection).unsubscribe();
  
  return {
    pb,
    getSingleCollection,
    addToCollection,
    getCollectionList,
    updateCollection,
    getFilteredCollection,
    subsribeToCollection,
    subscribeToCollectionRecord,
    unSubscribeFromCollection,
    filterCollectionByUser,
  };
};

export default useCollection;
