import React from "react";
import IconServerError from "../partials/IconServerError";
import Pills from "../partials/Pills";
import { Archive, ArchiveRestore, FilePenLine, Trash2 } from "lucide-react";
import LoadMore from "../partials/LoadMore";
import IconNoData from "../partials/IconNoData";
import TableLoader from "../partials/TableLoader";
import SpinnerTable from "../partials/spinners/SpinnerTable";
import { StoreContext } from "@/components/store/storeContext";
import {
  setIsAdd,
  setIsConfirm,
  setIsDelete,
} from "@/components/store/storeAction";
import ModalDelete from "../partials/modals/ModalDelete";
import ModalConfirm from "../partials/modals/ModalConfirm";

const CategoryTable = () => {
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
      <div className="p-4 bg-secondary rounded-md mt-10 border border-line relative">
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
                  <td>Chicken Joy</td>

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

export default CategoryTable;
