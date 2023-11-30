"use client"
// import UserService from "/services/UserService";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";
import SideNav from "/components/common/nav/SideNav";
import AppTopNav from "../../../AppTopNav";
import {H1} from "/components/common/Сontent";
import FooterNav from "/components/common/nav/FooterNav";
import useAxiosAuth from "../../../../lib/hooks/useAxiosAuth";

function CreateInformation({ availableOwnerList, availableVertreterList, availableBearbeiterList }) {
  const { data: session } = useSession();
  const router = useRouter();
  const axiosAuth = useAxiosAuth();

  // const informationService = new InformationService(session);

  const [userInfo, setUserInfo] = useState({});

  const formBtnRef = useRef(null); //btn form action

  // const userService = new UserService(session);

  // useEffect(() => {
  //   let username = session?.user?.name;
    
    // if(!username)
    //   username = "admin"
    
    // if(username){
    //   userService
    //       .getByUsername(username)
    //       .then((res) => setUserInfo(res.data));
    // }

  // }, [session]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchPost = async (formData) => {
    const res = await axiosAuth.post("/api/v1/asset/informations/", formData);

    let informationArray = res.data;
    if (Array.isArray(informationArray)) {
      setInformations(informationArray);
    }
  };
  
  const onSubmit = (data) => {
    let formData = new FormData();

    let information = {
      entityId: data.entityId,
      name: data.name,
      saStatus: data.saStatus,
      sbStatus: data.sbStatus,
      owner: userInfo,
      vertreter: userInfo,
      editor: userInfo,
      beschreibung: data.beschreibung,
      // location: location,
      // category: selectedCategory,
      canEdit: data.canEdit
    };

    const json = JSON.stringify(information);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("information", blob);
    // selectedImageFiles.forEach((imageFile) =>
    //   formData.append("multipartFile", imageFile)
    // );
    toast.promise(
        axiosAuth
        .post("/api/v1/asset/informations/" + "save", formData, {
              headers: {
                'Content-Type':'multipart/form-data', //TODO json
              },
            })
            // informationService.save(formData)
            .then((res) => {
        if(res.status === 200)
          router.push("/asset/informationSa/detail/" + res.data.entityId);
      }),
      {
        loading: 'Your information is saving...',
        success: <b>Information saved!</b>,
        error: <b>Could not save.</b>,
      },{
        style: {
          border: '1px solid #14b8a5',
          padding: '16px',
          color: '#14b8a5',
        },
        iconTheme: {
          primary: '#14b8a5',
          secondary: '#FFFAEE',
        },
      }
    )
  };

  // const selectImageUrl = (e) => {
  //   if (e.target.files) {
  //     setSelectedImageFiles(Array.from(e.target.files));
  //
  //     const imagesUrlArray = Array.from(e.target.files).map((image) => {
  //       return URL.createObjectURL(image);
  //     });
  //
  //     setSelectedImageUrls((previousImageUrls) =>
  //       previousImageUrls.concat(imagesUrlArray)
  //     );
  //
  //     let firstImage = imagesUrlArray[0];
  //     setFirstImage(firstImage);
  //   }
  // };

  const handleSelectCity = (cityId) => {
    let selectedCity = cities.filter((city) => city.cityId == cityId)[0];
    setSelectedCity(selectedCity);
  };

  const handleSelectCategory = (categoryId) => {
    let category = categories.filter(
      (item) => item.categoryId == categoryId
    )[0];
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // const removeImageModal = () => {
  //   setIsOpen(false);
  //   const imageList = selectedImageUrls.filter(
  //     (image) => image !== selectedImageForDetail
  //   );
  //   setSelectedImageUrls(imageList);
  // };

  
  return (
      <>
        <div className="wrapper">
          <SideNav />
          <div className="main">
            <AppTopNav/>
            <main className="content">
              <div className="container-fluid">
                <div className="header">
                  <H1 text="Informationen" />
                  <p className="header-subtitle">Strukturanalyse</p>
                </div>
                {/*<#nested />*/}
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">

                        {/*<div class="row mb-3 pb-3 ">*/}
                          {/*<form id="mainForm" method="post">*/}
                            {/*<input type="hidden" name="asset_id" value="60">*/}
                          {/*</form>*/}
                        {/*</div>*/}
                        

                        {/*<div className="max-w-7xl mx-auto my-4">*/}
                        {/*  <div className="grid grid-cols-1 sm:grid-cols-2">*/}
                        {/*    <div>*/}
                              {/*<h2 className="text-center text-3xl font-semibold mt-20">*/}
                              {/*  Save Your Information*/}
                              {/*</h2>*/}
                              <form id="informationForm"
                                  className=""
                                  onSubmit={handleSubmit(onSubmit)}
                              >


                                <div className="row mb-3">
                                  <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                                  <div className="col-sm-10 error-placeholder">
                                    {/*<input type="text" className="form-control" id="name" name="name" placeholder="Name" value="${(asset.name)!}">*/}
                                    <input type="text" id="name" name="name" placeholder="Name"
                                           {...register("name", {
                                             required: "Please enter name",
                                           })}
                                           className="form-control disableable"
                                    />
                                    <p className="text-[#ed6172] font-semibold px-2">
                                      {errors.name?.message}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="row mb-3">
                                  <label htmlFor="beschreibung" className="col-sm-2 col-form-label">Beschreibung</label>
                                  <div className="col-sm-10 error-placeholder">
                                    {/*<input type="text" className="form-control" id="name" name="name" placeholder="Name" value="${(asset.name)!}">*/}
                                    <input type="text" id="beschreibung" name="beschreibung" placeholder="Beschreibung"
                                           {...register("beschreibung", {
                                             // required: "Please enter beschreibung",
                                           })}
                                           className="form-control"
                                    />
                                    <p className="text-[#ed6172] font-semibold px-2">
                                      {errors.beschreibung?.message}
                                    </p>
                                  </div>
                                </div>

                                
                                {/*Eugen: inside form submit*/}
                                <button type="submit" className="btn btn-primary me-1" ref={formBtnRef}>speichern</button>

                                <a className="btn btn-light" href="/asset/informationSa/list" >zurück</a>

                              </form>
                            </div>

                            <div className="">
                              {/*<div className="relative flex flex-col p-3 pb-5 mt-5 sm:mt-36">*/}
                              {/*<label className="text-start mx-auto sm:mx-0 text-gray-500">*/}
                              {/*  Choose images of your information.*/}
                              {/*</label>*/}

                              {/*<img*/}
                              {/*  src={*/}
                              {/*    firstImage ||*/}
                              {/*    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="*/}
                              {/*  }*/}
                              {/*  className="w-96 h-52 object-cover mt-3 mx-auto sm:mx-0 cursor-pointer rounded-lg"*/}
                              {/*  onClick={() => {*/}
                              {/*    if (firstImage) {*/}
                              {/*      setIsOpen(true);*/}
                              {/*      setSelectedImageForDetail(firstImage);*/}
                              {/*    } else {*/}
                              {/*      fileRef.current.click();*/}
                              {/*    }*/}
                              {/*  }}*/}
                              {/*/>*/}

                              {/*<PlusCircleIcon*/}
                              {/*  className="w-10 absolute bottom-0 right-10 sm:right-0 sm:-bottom-2 md:right-6 lg:right-56*/}
                              {/*    cursor-pointer hover:scale-105 transform transition-all duration-150 ease-in-out"*/}
                              {/*  color="#14b8a5"*/}
                              {/*  onClick={() => fileRef.current.click()}*/}
                              {/*/>*/}
                              {/*</div>*/}

                              {/*{selectedImageUrls.length > 0 && (*/}
                              {/*  <div*/}
                              {/*    className="max-w-7xl w-96 flex flex-row space-x-3*/}
                              {/*    overflow-x-scroll mx-auto md:mx-4 py-3 scrollbar-thin scrollbar-thumb-teal-600"*/}
                              {/*  >*/}
                              {/*    {selectedImageUrls?.map((image) => (*/}
                              {/*      <img*/}
                              {/*        className={`w-52 object-cover mt-5 cursor-pointer rounded-lg*/}
                              {/*         ${firstImage === image ? "hidden" : "visible"}`}*/}
                              {/*        key={image}*/}
                              {/*        src={image}*/}
                              {/*        onClick={() => {*/}
                              {/*          setIsOpen(true);*/}
                              {/*          setSelectedImageForDetail(image);*/}
                              {/*        }}*/}
                              {/*      />*/}
                              {/*    ))}*/}
                              {/*  </div>*/}
                              {/*)}*/}

                              {/*Eugen: outside form submit*/}
                              {/*<button type="submit" className="btn btn-primary" onClick={() => formBtnRef.current.click()}>speichern</button>*/}
                              
                {/*              <div className="text-center md:w-96 md:text-center md:mx-4">*/}
                {/*                <button*/}
                {/*                    className="px-10 py-1 bg-teal-400 rounded-lg mt-5 sm:mt-16*/}
                {/*text-lg font-semibold shadow-md hover:shadow-lg hover:bg-teal-100"*/}
                {/*                >*/}
                {/*                  Save*/}
                {/*                </button>*/}
                {/*              </div>*/}

                            </div>
                          </div>

                          {/*<input*/}
                          {/*  ref={fileRef}*/}
                          {/*  hidden*/}
                          {/*  multiple*/}
                          {/*  type="file"*/}
                          {/*  accept="image/png, image/jpeg, image/webp"*/}
                          {/*  onChange={selectImageUrl}*/}
                          {/*/>*/}
                        </div>


                      {/*</div>*/}
                    {/*</div>*/}
                  {/*</div>*/}
                </div>
              </div>
            </main>
            {/*<@footer />*/}
            <FooterNav />
          </div>
        </div>
      </>
  )
  
  
  // return (
  //   <div className="relative">
  //     <Header />
  //     <Toaster position="top-center" />
  //    
  //
  //     {/*{isOpen && (*/}
  //     {/*  <ImageDialog*/}
  //     {/*    imageUrl={selectedImageForDetail}*/}
  //     {/*    isOpen={isOpen}*/}
  //     {/*    closeModal={closeModal}*/}
  //     {/*    removeImageModal={removeImageModal}*/}
  //     {/*    isRemoveBtnExist={true}*/}
  //     {/*  />*/}
  //     {/*)}*/}
  //   </div>
  // );
}

// export async function getServerSideProps() {

  // const availableOwnerList = await fetch("http://localhost:8080/api/v1/asset/informations/availableOwners").then(
  //     (res) => res.json()
  // );  
  //
  // const availableVertreterList = await fetch("http://localhost:8080/api/v1/asset/informations/availableVertreters").then(
  //     (res) => res.json()
  // );
  //
  // const availableBearbeiterList = await fetch("http://localhost:8080/api/v1/asset/informations/availableBearbeiters").then(
  //   (res) => res.json()
  // );

  // return {
  //   props: {
      // availableOwnerList,
      // availableVertreterList,
      // availableBearbeiterList
    // },
  // };
// }

export default CreateInformation;
