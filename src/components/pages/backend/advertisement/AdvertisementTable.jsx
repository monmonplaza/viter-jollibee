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
import useTableActions from "@/components/custom-hook/useTableActions";
import useQueryData from "@/components/custom-hook/useQueryData";
import { ver } from "@/components/helpers/functions-general";
import LoaderTable from "../partials/LoaderTable";

const AdvertisementTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  let counter = 1;
  const {
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
    aid,
    data,
    isActive,
  } = useTableActions({
    setItemEdit,
  });

  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/${ver}/advertisement`, // endpoint
    "get", // method
    "advertisement" // key
  );
  return (
    <>
      <div className="p-4 bg-secondary rounded-md mt-5 border border-line relative">
        {!isLoading && isFetching && <SpinnerTable />}
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
              {((isLoading && !isFetching) || result?.data.length === 0) && (
                <tr>
                  <td colSpan="100%">
                    {isLoading ? (
                      <LoaderTable count={30} cols={6} />
                    ) : (
                      <IconNoData />
                    )}
                  </td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    <IconServerError />
                  </td>
                </tr>
              )}
              {result?.data.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{counter++}.</td>
                    <td>
                      <Pills isActive={item.advertisement_is_active} />
                    </td>
                    <td>{item.advertisement_title}</td>

                    <td>
                      <ul className="table-action ">
                        {item.advertisement_is_active === 1 ? (
                          <>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Edit"
                                onClick={() =>
                                  handleEdit(item.advertisement_aid, item)
                                }
                              >
                                <FilePenLine />
                              </button>
                            </li>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Archive"
                              >
                                <Archive
                                  onClick={() =>
                                    handleArchive(item.advertisement_aid, item)
                                  }
                                />
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Restore"
                              >
                                <ArchiveRestore
                                  onClick={() =>
                                    handleRestore(item.advertisement_aid, item)
                                  }
                                />
                              </button>
                            </li>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Delete"
                                onClick={() =>
                                  handleRemove(item.advertisement_aid, item)
                                }
                              >
                                <Trash2 />
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/${ver}/advertisement/${aid}`}
          queryKey="advertisement"
          item={data.advertisement_title}
          filename={data.advertisement_image}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/${ver}/advertisement/active/${aid}`}
          queryKey="advertisement"
          item={data.advertisement_title}
          active={isActive}
        />
      )}
    </>
  );
};

export default AdvertisementTable;
