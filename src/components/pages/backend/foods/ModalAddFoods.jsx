import React from "react";
import ModalWrapper from "../partials/modals/ModalWrapper";
import { ImagePlusIcon, X } from "lucide-react";
import SpinnerButton from "../partials/spinners/SpinnerButton";
import { StoreContext } from "@/components/store/storeContext";
import {
  setIsAdd,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/storeAction";
import { Form, Formik } from "formik";
import {
  InputPhotoUpload,
  InputSelect,
  InputText,
} from "@/components/helpers/FormInputs";
import * as Yup from "Yup";
import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import {
  devBaseImgUrl,
  imgPath,
  ver,
} from "@/components/helpers/functions-general";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";
import useQueryData from "@/components/custom-hook/useQueryData";

const ModalAddFoods = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
  const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto(
    `/${ver}/upload/photo`
  );
  const [withPhoto, setWithPhoto] = React.useState(false);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const {
    isLoading: loadingCategory,
    isFetching: fetchingCategory,
    error: errorCategory,
    data: category,
  } = useQueryData(
    `/${ver}/food/read-all-active`, // endpoint
    "get", // method
    "read-all-active" // key
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit ? `/${ver}/food/${itemEdit.food_aid}` : `/${ver}/food`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch

      queryClient.invalidateQueries({
        queryKey: ["food"],
      });

      // show error box
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Record Successfully updated.`));
        dispatch(setIsAdd(false));
      }
    },
  });

  const initVal = itemEdit
    ? { ...itemEdit, food_title_old: itemEdit.food_title }
    : {
        food_title: "",
        food_price: "",
        food_category_id: "",
        food_title_old: "",
      };

  const yupSchema = Yup.object({
    food_title: Yup.string().required("Require"),
    food_price: Yup.string().required("Require"),
    food_category_id: Yup.string().required("Require"),
  });

  return (
    <>
      <ModalWrapper>
        <div className="modal-side absolute top-0 right-0 bg-primary h-[100dvh] w-[300px] border-l border-line">
          <div className="modal-header p-4 flex justify-between items-center">
            <h5 className="mb-0">Add Food</h5>
            <button onClick={handleClose}>
              <X />
            </button>
          </div>

          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              mutation.mutate({
                ...values,
                food_image:
                  (itemEdit && itemEdit.food_image === "") || photo
                    ? photo === null
                      ? itemEdit.food_image
                      : photo.name
                    : values.food_image,
              });
              uploadPhoto();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-form h-[calc(100vh-56px)] grid grid-rows-[1fr_auto]">
                    <div className="form-wrapper p-4 max-h-[85vh] h-full overflow-y-auto custom-scroll">
                      <div
                        className={`relative mt-5 mb-6 border border-gray-300 rounded-md hover:border-primary hover:border-dashed ${
                          withPhoto && "border-primary border-dashed"
                        }`}
                        onDragOver={() => setWithPhoto(true)}
                        onDragLeave={() => setWithPhoto(false)}
                      >
                        {photo || (itemEdit && itemEdit.food_image !== "") ? (
                          <img
                            src={
                              photo
                                ? URL.createObjectURL(photo) // preview
                                : itemEdit.food_image // check db
                                ? devBaseImgUrl + "/" + itemEdit.food_image
                                : null
                            }
                            alt="car photo"
                            className="rounded-tr-md rounded-tl-md h-[200px] max-h-[200px] w-full object-cover object-center m-auto"
                          />
                        ) : (
                          <span className="min-h-20 flex items-center justify-center">
                            <span className="text-accent mr-1">
                              Drag & Drop
                            </span>{" "}
                            photo here or{" "}
                            <span className="text-accent ml-1">Browse</span>
                          </span>
                        )}

                        {(photo !== null ||
                          (itemEdit && itemEdit.food_image !== "")) && (
                          <span className="min-h-10 flex items-center justify-center">
                            <span className="text-accent mr-1">
                              Drag & Drop
                            </span>{" "}
                            photo here or{" "}
                            <span className="text-accent ml-1">Browse</span>
                          </span>
                        )}

                        {/* <FaUpload className="opacity-100 duration-200 group-hover:opacity-100 fill-dark/70 absolute top-0 right-0 bottom-0 left-0 min-w-[1.2rem] min-h-[1.2rem] max-w-[1.2rem] max-h-[1.2rem] m-auto cursor-pointer" /> */}
                        <InputPhotoUpload
                          label="Car Photo"
                          name="photo"
                          type="file"
                          id="myFile"
                          accept="image/*"
                          title="Upload photo"
                          onChange={(e) => handleChangePhoto(e)}
                          onDrop={(e) => handleChangePhoto(e)}
                          className="opacity-0 absolute right-0 bottom-0 left-0 m-auto cursor-pointer h-full "
                        />
                      </div>

                      <div className="input-wrap">
                        <InputText
                          label="Title"
                          type="text"
                          name="food_title"
                        />
                      </div>

                      <div className="input-wrap">
                        <InputText
                          label="Price"
                          type="text"
                          name="food_price"
                        />
                      </div>

                      <div className="input-wrap">
                        <InputSelect label="Category" name="food_category_id">
                          {loadingCategory ? (
                            <option value="" hidden>
                              Loading...
                            </option>
                          ) : errorCategory ? (
                            <option value="" disabled>
                              Error
                            </option>
                          ) : (
                            <optgroup label="Select unit">
                              <option value="" hidden></option>
                              {category?.data.length > 0 ? (
                                <>
                                  {category?.data.map((cItem, key) => {
                                    return (
                                      <option
                                        value={cItem.category_aid}
                                        key={key}
                                      >
                                        {cItem.category_title}
                                      </option>
                                    );
                                  })}
                                </>
                              ) : (
                                <option value="" disabled>
                                  No data
                                </option>
                              )}
                            </optgroup>
                          )}
                        </InputSelect>
                      </div>
                    </div>
                    <div className="form-action flex p-4 justify-end gap-3">
                      <button
                        className="btn btn-add"
                        type="submit"
                        disabled={!props.dirty}
                      >
                        {mutation.isPending ? (
                          <SpinnerButton />
                        ) : itemEdit ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        className="btn btn-cancel"
                        onClick={handleClose}
                        type="reset"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalAddFoods;
