import useQueryData from "@/components/custom-hook/useQueryData";
import useTableActions from "@/components/custom-hook/useTableActions";
import { ver } from "@/components/helpers/functions-general";
import { StoreContext } from "@/components/store/storeContext";
import { Archive, ArchiveRestore, FilePenLine, Trash2 } from "lucide-react";
import React from "react";
import IconNoData from "../partials/IconNoData";
import IconServerError from "../partials/IconServerError";
import LoaderTable from "../partials/LoaderTable";
import Pills from "../partials/Pills";
import ModalConfirm from "../partials/modals/ModalConfirm";
import ModalDelete from "../partials/modals/ModalDelete";
import SpinnerTable from "../partials/spinners/SpinnerTable";

const CategoryTable = ({ setItemEdit }) => {
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
    `/${ver}/category`, // endpoint
    "get", // method
    "category" // key
  );

  return (
    <>
      <div className="p-4 bg-secondary rounded-md mt-5 border border-line relative">
        {!isLoading && isFetching && <SpinnerTable />}

        <div className="table-wrapper custom-scroll">
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
                      <Pills isActive={item.category_is_active} />
                    </td>
                    <td>{item.category_title}</td>

                    <td>
                      <ul className="table-action ">
                        {item.category_is_active === 1 ? (
                          <>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Edit"
                                onClick={() =>
                                  handleEdit(item.category_aid, item)
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
                                    handleArchive(item.category_aid, item)
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
                                    handleRestore(item.category_aid, item)
                                  }
                                />
                              </button>
                            </li>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Delete"
                                onClick={() =>
                                  handleRemove(item.category_aid, item)
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
          mysqlApiDelete={`/${ver}/category/${aid}`}
          queryKey="category"
          item={data.category_title}
          filename={data.category_thumbnail}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/${ver}/category/active/${aid}`}
          queryKey="category"
          item={data.category_title}
          active={isActive}
        />
      )}
    </>
  );
};

export default CategoryTable;
