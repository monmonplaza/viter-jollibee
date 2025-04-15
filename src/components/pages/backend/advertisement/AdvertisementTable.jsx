import {
  setIsAdd,
  setIsConfirm,
  setIsDelete,
} from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import { Archive, ArchiveRestore, FilePenLine, Trash2 } from "lucide-react";
import React from "react";
import IconNoData from "../partials/IconNoData";
import IconServerError from "../partials/IconServerError";
import LoadMore from "../partials/LoadMore";
import Pills from "../partials/Pills";
import TableLoader from "../partials/TableLoader";
import ModalConfirm from "../partials/modals/ModalConfirm";
import ModalDelete from "../partials/modals/ModalDelete";
import SpinnerTable from "../partials/spinners/SpinnerTable";

const AdvertisementTable = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  let counter = 1;
  const handleEdit = () => {
    dispatch(setIsAdd(true));
  };

  const handleDelete = () => {
    dispatch(setIsDelete(true));
  };
  const handleRestore = () => {
    dispatch(setIsConfirm(true));
  };

  const handleArchive = () => {
    dispatch(setIsConfirm(true));
  };
  return (
    <>
      <div className="p-4 bg-secondary rounded-md mt-5 border border-line relative">
        {/* <SpinnerTable /> */}
        <div className="table-wrapper custom-scroll">
          {/* <TableLoader count={20} cols={4} /> */}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th className="w-[50%]">Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td colSpan={50}>
                  <IconNoData />
                </td>
              </tr>

              <tr>
                <td colSpan={50}>
                  <IconServerError />
                </td>
              </tr> */}
              {Array.from(Array(6).keys()).map((i) => (
                <tr key={i}>
                  <td>{counter++}.</td>
                  <td>
                    <Pills />
                  </td>
                  <td>Advertisement 1</td>

                  <td>
                    <ul className="table-action ">
                      {true ? (
                        <>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="Edit"
                              onClick={() => handleEdit()}
                            >
                              <FilePenLine />
                            </button>
                          </li>
                          <li>
                            <button className="tooltip" data-tooltip="Archive">
                              <Archive onClick={() => handleArchive()} />
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <button className="tooltip" data-tooltip="Restore">
                              <ArchiveRestore onClick={() => handleRestore()} />
                            </button>
                          </li>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="Delete"
                              onClick={handleDelete}
                            >
                              <Trash2 />
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <LoadMore />
        </div>
      </div>
      {store.isDelete && <ModalDelete />}
      {store.isConfirm && <ModalConfirm />}
      {store.isView && <ModalViewMovie movieInfo={movieInfo} />}
    </>
  );
};

export default AdvertisementTable;
