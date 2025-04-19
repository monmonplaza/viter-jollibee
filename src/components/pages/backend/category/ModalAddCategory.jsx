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
import * as Yup from "Yup";
import { InputPhotoUpload, InputText } from "@/components/helpers/FormInputs";
import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import { devBaseImgUrl, ver } from "@/components/helpers/functions-general";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";

const ModalAddCategory = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
  const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto(
    `/${ver}/upload/photo`
  );
  const [withPhoto, setWithPhoto] = React.useState(false);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/${ver}/category/${itemEdit.category_aid}`
          : `/${ver}/category`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch

      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["category"],
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
    ? { ...itemEdit, category_title_old: itemEdit.category_title }
    : {
        category_title: "",
        category_thumbnail: "",
        category_title_old: "",
      };

  const yupSchema = Yup.object({
    category_title: Yup.string().required("Require"),
  });

  return (
    <>
      <ModalWrapper>
        <div className="modal-side absolute top-0 right-0 bg-primary h-[100dvh] w-[300px] border-l border-line">
          <div className="modal-header p-4 flex justify-between items-center">
            <h5 className="mb-0">Add Category</h5>
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
                category_thumbnail:
                  (itemEdit && itemEdit.category_thumbnail === "") || photo
                    ? photo === null
                      ? itemEdit.category_thumbnail
                      : photo.name
                    : values.category_thumbnail,
              });

              uploadPhoto();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-form  h-[calc(100vh-56px)] grid grid-rows-[1fr_auto]">
                    <div className="form-wrapper p-4 max-h-[85vh] h-full overflow-y-auto custom-scroll">
                      <div className="input-wrap">
                        <InputText
                          label="Title"
                          type="text"
                          name="category_title"
                        />
                      </div>

                      <div
                        className={`relative mt-5 mb-6 border border-gray-300 rounded-md hover:border-primary hover:border-dashed ${
                          withPhoto && "border-primary border-dashed"
                        }`}
                        onDragOver={() => setWithPhoto(true)}
                        onDragLeave={() => setWithPhoto(false)}
                      >
                        {photo ||
                        (itemEdit && itemEdit.category_thumbnail !== "") ? (
                          <img
                            src={
                              photo
                                ? URL.createObjectURL(photo) // preview
                                : itemEdit.category_thumbnail // check db
                                ? devBaseImgUrl +
                                  "/" +
                                  itemEdit.category_thumbnail
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
                          (itemEdit && itemEdit.category_thumbnail !== "")) && (
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
                    </div>
                    <div className="form-action flex p-4 justify-end gap-3 mb-4 ">
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

export default ModalAddCategory;
