import { Archive, Trash2, X } from "lucide-react";
import React from "react";
import ModalWrapper from "./ModalWrapper";
import { StoreContext } from "@/components/store/storeContext";
import {
  setIsConfirm,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/storeAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";
import SpinnerButton from "../spinners/SpinnerButton";

const ModalConfirm = ({ mysqlApiArchive, queryKey, item, active }) => {
  const { dispatch } = React.useContext(StoreContext);
  const handleClose = () => dispatch(setIsConfirm(false));
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(mysqlApiArchive, "put", values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      handleClose();
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setSuccess(true));
        dispatch(setMessage("Record updated"));
      }
    },
  });

  const handleYes = async () => {
    mutation.mutate({
      isActive: active ? 1 : 0,
    });
  };

  return (
    <>
      <ModalWrapper>
        <div className="modal-main bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full rounded-md border border-line">
          <div className="modal-header flex gap-2 p-2 items-center border-b border-line mb-2 ">
            <Archive size={16} stroke={"yellow"} />
            <span className="text-warning">Confirm</span>
            <button className="ml-auto" onClick={handleClose}>
              <X />
            </button>
          </div>
          <div className="modal-body p-2 py-4">
            <p className="mb-0 text-center">
              Are you sure you want to archive this movie?
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button className="btn btn-warning" onClick={handleYes}>
                {mutation.isPending ? (
                  <SpinnerButton />
                ) : active ? (
                  "Restore"
                ) : (
                  "Archive"
                )}
              </button>
              <button className="btn btn-cancel" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalConfirm;
