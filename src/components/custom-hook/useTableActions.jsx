import React from "react";
import {
  setIsAdd,
  setIsConfirm,
  setIsDelete,
  setIsReset,
  setIsSuspend,
} from "../store/StoreAction";
import { StoreContext } from "../store/StoreContext";

const useTableActions = ({ setItemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
  const [aid, setAid] = React.useState(null);
  const [data, setData] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);

  const handleRemove = (item_aid, item) => {
    setAid(item_aid);
    dispatch(setIsDelete(true));
    setData(item);
  };
  const handleEdit = (item_aid, item) => {
    setAid(item_aid);
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const handleArchive = (item_aid, item) => {
    setAid(item_aid);
    dispatch(setIsConfirm(true));
    setIsActive(false);
    setData(item);
  };
  const handleRestore = (item_aid, item) => {
    setAid(item_aid);
    dispatch(setIsConfirm(true));
    setIsActive(true);
    setData(item);
  };

  const handleReset = (item_aid, item) => {
    setAid(item_aid);
    setData(item);
    dispatch(setIsReset(true));
  };

  const handleSuspend = (item_aid, item) => {
    setAid(item_aid);
    setData(item);
    dispatch(setIsSuspend(true));
  };

  return {
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
    handleReset,
    handleSuspend,
    aid,
    data,
    isActive,
  };
};
export default useTableActions;
