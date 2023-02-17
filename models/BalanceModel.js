import { useState, useEffect } from "react";
import initialUserData from "../assets/dataUsers.json";
import LoadJson, { updateData } from "./PhoneStorage";

export function BalanceModel() {
  let [userDataObject, setUserDataObject] = useState(initialUserData);
  let [refreshing, setRefreshing] = useState(true);
  let minBalance = 9;
  this.jsonName = "dataUsers.json";

  useEffect(() => {
    this.getData();
  }, []);

  this.getDataObject = () => {
    return userDataObject;
  };

  this.getRefreshing = () => {
    return refreshing;
  };

  this.getData = async () => {
    const jsonObject = await LoadJson(this.jsonName, initialUserData);
    setUserDataObject(jsonObject);
    setRefreshing(false);
  };

  this.updateBalance = async (change) => {
    let updatedValue = this.getBalance() + change;
    await updateData({
      changeKey: "coins",
      value: updatedValue,
      setDataObject: setUserDataObject,
      dataObject: userDataObject,
      jsonName: this.jsonName,
    });
  };

  this.getValue = async (getKey) => {
    userDataObject.map((item) => {
      for (var key in item) {
        if (key === getKey) {
          return item[key];
        }
      }
    });
  };

  this.getBalance = () => {
    return userDataObject[0]["coins"];
  };

  this.isBalanceLow = () => {
    return this.getBalance() < minBalance ? true : false;
  };
}

export default BalanceModel;
