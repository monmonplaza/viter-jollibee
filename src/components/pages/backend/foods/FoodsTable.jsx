import {
  setIsAdd,
  setIsConfirm,
  setIsDelete,
} from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import {
  Archive,
  ArchiveRestore,
  FilePenLine,
  Plus,
  Trash2,
} from "lucide-react";
import React from "react";
import { menus } from "../menu-data";
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
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Searchbar from "../partials/Searchbar";
import LoaderTable from "../partials/LoaderTable";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";

const FoodsTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();

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

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["food", search.current.value, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/${ver}/food/search`, // search endpoint
        `/${ver}/food/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean, // search boolean
        {
          searchValue: search?.current?.value,
        }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="flex justify-between items-center">
        <Searchbar
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
        />
        <button className="btn btn-add" onClick={handleAdd}>
          <Plus size={16} /> Add New
        </button>
      </div>
      <div className="p-4 bg-secondary rounded-md mt-5 border border-line relative">
        <div className="table-wrapper custom-scroll">
          {/* <TableLoader count={20} cols={4} /> */}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th className="w-[50%]">Title</th>
                <th className="">Price</th>
                <th className="">Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(status === "loading" || result?.pages[0].data.length === 0) &&
                (status === "loading" ? (
                  <tr>
                    <td colSpan="100%">
                      <LoaderTable />
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="100%">
                      <IconNoData />
                    </td>
                  </tr>
                ))}
              {error && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    <IconServerError />
                  </td>
                </tr>
              )}

              {result?.pages.map((page, key) => (
                <React.Fragment key={key}>
                  {page?.data.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td>{counter++}.</td>
                        <td>
                          <Pills isActive={item.food_is_active} />
                        </td>
                        <td>{item.food_title}</td>
                        <td>{item.food_price}</td>
                        <td>{item.category_title}</td>

                        <td>
                          <ul className="table-action ">
                            {item.food_is_active === 1 ? (
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
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <LoadMore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages[0]}
            setPage={setPage}
            page={page}
            refView={ref}
          />
        </div>
      </div>
      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/${ver}/food/${aid}`}
          queryKey="food"
          item={data.food_title}
          filename={data.food_image}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/${ver}/food/active/${aid}`}
          queryKey="food"
          item={data.food_title}
          active={isActive}
        />
      )}
    </>
  );
};

export default FoodsTable;
