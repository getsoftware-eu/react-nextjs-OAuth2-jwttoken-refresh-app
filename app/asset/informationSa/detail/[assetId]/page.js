"use client"
import React, {useEffect, useRef, useState} from "react";
// import UserService from "/services/userService";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
// import { useDispatch } from "react-redux";
// import { add, remove } from "/redux/informationSlice";
import {toast} from "react-hot-toast";
// import InformationService from "/services/informationService";
import SideNav from "/components/common/nav/SideNav";
import TopNav from "/components/common/nav/TopNav";
import {H1} from "/components/common/Сontent";
import FooterNav from "/components/common/nav/FooterNav";
import {useForm} from "react-hook-form";
import useAxiosAuth from "../../../../../lib/hooks/useAxiosAuth";

// export async function generateStaticParams() {
//   return [{ id: '1' }, { id: '2' }]
// }

// async function getPost(params) {
//   const res = await fetch(`https://.../posts/${params.id}`)
//   const post = await res.json()
//
//   return post
// }

function InformationDetail({ params }) {

  const assetId = params.assetId;

  let getrequested = false;

  const { data: session } = useSession();
  // const userService = new UserService(session);
  // const informationService = new InformationService(session);
  const axiosAuth = useAxiosAuth();

  const router = useRouter();
  // const dispatch = useDispatch();

  const [assetname, setAssetname] = useState(''); // Declare a state variable...
  const [assetbeschreibung, setAssetbeschreibung] = useState(''); // Declare a state variable...

  const [information, setInformation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const formBtnRef = useRef(null); //btn form action

  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({});

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
  
  useEffect(() => {
    if(information.name)
    {
      setAssetname(information.name)
      setAssetbeschreibung(information.beschreibung)
    }
  }, [information]);
  
  useEffect(() => {
    if(session && getrequested)
      return;
    getAsynchData();
  }, [session]);

  
  const fetchPost = async () => {

    if(session)
      getrequested = true;
      
    const res = await axiosAuth.get("/api/v1/asset/informations/" + assetId);

    let information = res.data;
      
    setInformation(information);

    getrequested = true;

  };
  
  const getAsynchData = async () => {
    if (session) 
    {
     
      // await userService.getByEmail(session?.user?.email).then((res) => {
      //   const userInfo = res.data;
      //   // let isInformationFavorite = userInfo.favoriteInformations?.some(
      //   //   (h) => h.assetId === information.informationId
      //   // );
      //   setUser(userInfo);
      // });
      fetchPost().then();
      // await informationService.getById(assetId).then((res) => {
      //   const infa = res.data;
      //   setInformation(infa);
      // });
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // const handleFavoriteInformationIcon = () => {
  //   if (session) {
  //     if (!isFavorite) {
  //       toast.promise(
  //         userService.addInformationToFavorites(user?.userId, information).then((res) => {
  //           if (res.status === 200) setIsFavorite(true);
  //         }),
  //         {
  //           loading: "Saving...",
  //           success: <b>Added to favourites!</b>,
  //           error: <b>Could not added.</b>,
  //         }
  //       );
  //     } else {
  //       toast.promise(
  //         userService
  //           .removeInformationFromFavorites(user?.userId, information)
  //           .then((res) => {
  //             if (res.status === 200) setIsFavorite(false);
  //           }),
  //         {
  //           loading: "Removing...",
  //           success: <b>Removed from favourites!</b>,
  //           error: <b>Could not removed.</b>,
  //         }
  //       );
  //     }
  //   } else {
  //     toast.error("Please login to add to favourites.", {
  //       style: {
  //         border: "1px solid #ed6172",
  //         padding: "8px",
  //         color: "#ed6172",
  //       },
  //       iconTheme: {
  //         primary: "#ed6172",
  //         secondary: "#FFFAEE",
  //       },
  //     });
  //   }
  // };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let formData = new FormData();

    let tempInformation = {
      entityId: information.entityId,
      name: assetname,
      saStatus: data.saStatus,
      sbStatus: data.sbStatus,
      owner: userInfo,
      vertreter: userInfo,
      editor: userInfo,
      beschreibung: assetbeschreibung,
      // location: location,
      // category: selectedCategory,
      canEdit: data.canEdit
    };

    const json = JSON.stringify(tempInformation);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("information", blob);
    // selectedImageFiles.forEach((imageFile) =>
    //   formData.append("multipartFile", imageFile)
    // );
    toast.promise(
        // informationService.update(formData, information.entityId).then((res) => {
        axiosAuth
            .post("/api/v1/asset/informations/" + assetId + "/update", formData, {
              headers: {
                'Content-Type':'multipart/form-data', //TODO json
              },
            })   
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

  // const calculateDaysBetweenDates = () => {
  //   const difference = endDate.getTime() - startDate.getTime();
  //   return Math.ceil(difference / (1000 * 3600 * 24)) + 1;
  // };

  // eu: Для перехода в следующее состояние сохраняя transition data
  // const goToNextPhase = () => {
  //   if (session) {
  //     dispatch(remove());
  //
  //     const days = calculateDaysBetweenDates();
  //     const informationForReserve = {
  //       informationId: information.informationId,
  //       city: information.beschreibung,
  //       // startDate: startDate,
  //       // endDate: endDate,
  //       days: days,
  //       totalPrice: selectedDayCount  + 100,
  //     };
  //     dispatch(add(informationForReserve));
  //     router.push("/payment");
  //   } else {
  //     toast.error("Please login to reserve a information.", {
  //       style: {
  //         border: "1px solid #ed6172",
  //         padding: "8px",
  //         color: "#ed6172",
  //       },
  //       iconTheme: {
  //         primary: "#ed6172",
  //         secondary: "#FFFAEE",
  //       }
  //     });
  //   }
  // };


  return (
      <>
        <div className="wrapper">
          <SideNav />
          <div className="main">
            <TopNav/>
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




                        {/*<div className="max-w-7xl mx-auto my-4">*/}
                        {/*  <div className="grid grid-cols-1 sm:grid-cols-2">*/}
                        {/*    <div>*/}
                        {/*<h2 className="text-center text-3xl font-semibold mt-20">*/}
                        {/*  Save Your Information*/}
                        {/*</h2>*/}
                        <form
                            className="flex flex-col mx-auto gap-2 w-fit mt-10 space-y-3"
                            onSubmit={handleSubmit(onSubmit)}
                        >

                          <input type="hidden" id="entityId" name="entityId" value={information.entityId}/>
                          
                          <div className="row mb-3">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10 error-placeholder">
                              {/*<input type="text" className="form-control" id="name" name="name" placeholder="Name" value="${(asset.name)!}">*/}
                              <input type="text" name="name" required={true}
                                     {...register("name", {
                                       // required: "Please enter beschreibung",
                                     })}
                                     // defaultValue={assetName}
                                     value={assetname} // ...force the input's value to match the state variable...
                                     onChange={e => setAssetname(e.target.value)} // ... and update the state variable on any edits!
                                     className="form-control"
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
                                     value={assetbeschreibung}
                                     onChange={e => setAssetbeschreibung(e.target.value)} // ... and update the state variable on any edits!
                                     className="form-control"
                              />
                              <p className="text-[#ed6172] font-semibold px-2">
                                {errors.beschreibung?.message}
                              </p>
                            </div>
                          </div>


                          {/*<div className="flex flex-col space-y-2">*/}
                          {/*  <label className="px-1 text-gray-500">*/}
                          {/*    In which city is your information located?*/}
                          {/*  </label>*/}
                          {/*  <select*/}
                          {/*      className="formInput px-2"*/}
                          {/*      onChange={(e) => {*/}
                          {/*        handleSelectCity(e.target.value);*/}
                          {/*      }}*/}
                          {/*  >*/}
                          {/*    {cities?.map((city) => (*/}
                          {/*        <option key={city.cityId} value={city.cityId}>*/}
                          {/*          {city.cityName}*/}
                          {/*        </option>*/}
                          {/*    ))}*/}
                          {/*  </select>*/}
                          {/*</div>*/}
                          {/*<div className="flex flex-col space-y-2">*/}
                          {/*  <label className="px-1 text-gray-500">*/}
                          {/*    What is the category of your information?*/}
                          {/*  </label>*/}
                          {/*  <select*/}
                          {/*      className="formInput px-2"*/}
                          {/*      onChange={(e) => {*/}
                          {/*        handleSelectCategory(e.target.value);*/}
                          {/*      }}*/}
                          {/*  >*/}
                          {/*    {categories?.map((category) => (*/}
                          {/*        <option*/}
                          {/*            key={category.categoryId}*/}
                          {/*            value={category.categoryId}*/}
                          {/*        >*/}
                          {/*          {category.categoryName}*/}
                          {/*        </option>*/}
                          {/*    ))}*/}
                          {/*  </select>*/}
                          {/*</div>*/}
                          {/*<div className="flex flex-col space-y-2">*/}
                          {/*  <label className="px-1 text-gray-500">*/}
                          {/*    How much income do you want to earn?*/}
                          {/*  </label>*/}
                          {/*  <input*/}
                          {/*      {...register("price", { required: "Please enter price" })}*/}
                          {/*      className="formInput"*/}
                          {/*      type="number"*/}
                          {/*      placeholder="Daily Price"*/}
                          {/*  />*/}
                          {/*  <p className="text-[#ed6172] font-semibold px-2">*/}
                          {/*    {errors.price?.message}*/}
                          {/*  </p>*/}
                          {/*</div>*/}
                          {/*<div className="flex flex-col space-y-2">*/}
                          {/*  <label className="px-1 text-gray-500">*/}
                          {/*    What is the maximum guest capacity of your information?*/}
                          {/*  </label>*/}
                          {/*  <input*/}
                          {/*      {...register("capacity", {*/}
                          {/*        required: "Please enter this field",*/}
                          {/*      })}*/}
                          {/*      className="formInput "*/}
                          {/*      type="number"*/}
                          {/*      placeholder="Guest capacity"*/}
                          {/*      min={1}*/}
                          {/*  />*/}
                          {/*  <p className="text-[#ed6172] font-semibold px-2">*/}
                          {/*    {errors.capacity?.message}*/}
                          {/*  </p>*/}
                          {/*</div>*/}
                          {/*<div className="flex flex-col space-y-2">*/}
                          {/*  <label className="px-1 text-gray-500">*/}
                          {/*    What is the address of the your information?*/}
                          {/*  </label>*/}
                          {/*  <input*/}
                          {/*      {...register("address", {*/}
                          {/*        required: "Please enter the information address",*/}
                          {/*      })}*/}
                          {/*      className="formInput"*/}
                          {/*      type="text"*/}
                          {/*      placeholder="Address"*/}
                          {/*  />*/}
                          {/*  <p className="text-[#ed6172] font-semibold px-2">*/}
                          {/*    {errors.address?.message}*/}
                          {/*  </p>*/}
                          {/*</div>*/}
                          {/*<div className="flex flex-col space-y-2">*/}
                          {/*  <label className="px-1 text-gray-500">*/}
                          {/*    Write small description about your information.*/}
                          {/*  </label>*/}
                          {/*  <input*/}
                          {/*      {...register("description", {*/}
                          {/*        required: "Please enter description",*/}
                          {/*      })}*/}
                          {/*      className="formInput"*/}
                          {/*      type="text"*/}
                          {/*      placeholder="Small Description"*/}
                          {/*  />*/}
                          {/*  <p className="text-[#ed6172] font-semibold px-2">*/}
                          {/*    {errors.address?.message}*/}
                          {/*  </p>*/}
                          {/*</div>*/}


                          {/*Eugen: inside form submit*/}
                          <button type="submit" className="btn btn-primary me-1" ref={formBtnRef}>speichern</button>

                          <a className="btn btn-light" href="/asset/informationSa/list">zurück</a>

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
  //   <div className="pb-10">
  //     {/*<Header />*/}
  //     <Toaster position="top-right" />
  //     <div className="max-w-7xl mx-auto">
  //       <div className="grid grid-cols-1 sm:grid-cols-2 px-6 py-12 w-full h-64">
  //         {/* Images */}
  //         {/*<div className="">*/}
  //         {/*  /!*<div className="flex flex-row">*!/*/}
  //         {/*  /!*  <Image*!/*/}
  //         {/*  /!*    src={firstImage}*!/*/}
  //         {/*  /!*    className="w-[400px] h-60 object-cover cursor-pointer rounded-lg shadow-md*!/*/}
  //         {/*  /!*        hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg hover:z-10"*!/*/}
  //         {/*  /!*    width={1200}*!/*/}
  //         {/*  /!*    height={100}*!/*/}
  //         {/*  /!*    onClick={() => handleSelectImage(firstImage)}*!/*/}
  //         {/*  /!*  />*!/*/}
  //         {/*  /!*  <div className="space-y-4 ml-1 flex flex-col">*!/*/}
  //         {/*  /!*    {secondImage && (*!/*/}
  //         {/*  /!*      <Image*!/*/}
  //         {/*  /!*        src={secondImage}*!/*/}
  //         {/*  /!*        className="w-[200px] h-28 object-cover mx-auto sm:mx-0 cursor-pointer rounded-lg shadow-md*!/*/}
  //         {/*  /!*        hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg"*!/*/}
  //         {/*  /!*        width={1200}*!/*/}
  //         {/*  /!*        height={100}*!/*/}
  //         {/*  /!*        onClick={() => handleSelectImage(secondImage)}*!/*/}
  //         {/*  /!*      />*!/*/}
  //         {/*  /!*    )}*!/*/}
  //         {/*  /!*    {thirdImage && (*!/*/}
  //         {/*  /!*      <Image*!/*/}
  //         {/*  /!*        src={thirdImage}*!/*/}
  //         {/*  /!*        className="w-[200px] h-28 object-cover mx-auto sm:mx-0 cursor-pointer rounded-lg shadow-md*!/*/}
  //         {/*  /!*        hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg"*!/*/}
  //         {/*  /!*        width={1200}*!/*/}
  //         {/*  /!*        height={100}*!/*/}
  //         {/*  /!*        onClick={() => handleSelectImage(thirdImage)}*!/*/}
  //         {/*  /!*      />*!/*/}
  //         {/*  /!*    )}*!/*/}
  //         {/*  /!*  </div>*!/*/}
  //         {/*  /!*</div>*!/*/}
  //         {/*  /!*<div className="mt-2">*!/*/}
  //         {/*  /!*  <p*!/*/}
  //         {/*  /!*    className="text-gray-500 text-sm text-center cursor-pointer*!/*/}
  //         {/*  /!*            hover:underline pb-4"*!/*/}
  //         {/*  /!*  >*!/*/}
  //         {/*  /!*    Show all images*!/*/}
  //         {/*  /!*  </p>*!/*/}
  //         {/*  */}
  //         {/*  /!*  <div className="flex items-center px-2">*!/*/}
  //         {/*  /!*    <Image*!/*/}
  //         {/*  /!*      className="h-8 w-8 object-cover rounded-full"*!/*/}
  //         {/*  /!*      src={*!/*/}
  //         {/*  /!*        tenant?.profilePicture?.imageUrl ||*!/*/}
  //         {/*  /!*        "https://res.cloudinary.com/dspea8wm4/image/upload/v1676743195/default_profile_pic_aqsicv.jpg"*!/*/}
  //         {/*  /!*      }*!/*/}
  //         {/*  /!*      width={100}*!/*/}
  //         {/*  /!*      height={100}*!/*/}
  //         {/*  /!*    />*!/*/}
  //         {/*  /!*    <p className="pl-2 text-gray-600 text-md ">Your Host: </p>*!/*/}
  //         {/*  /!*       *!/*/}
  //         {/*  /!*    <p className="pl-2 text-gray-600 text-md font-semibold">*!/*/}
  //         {/*  /!*      {information.owner.fullName}*!/*/}
  //         {/*  /!*    </p>*!/*/}
  //         {/*  /!*  </div>*!/*/}
  //         {/*  /!*</div>*!/*/}
  //        
  //         {/*  <div className="mt-5 px-3">*/}
  //         {/*    <h3 className="font-semibold text-xl border-t pt-2">*/}
  //         {/*      Services you will have in this information*/}
  //         {/*    </h3>*/}
  //         {/*    <div className="grid grid-cols-2 mt-6">*/}
  //         {/*      <div className="text-lg space-y-2 mr-2">*/}
  //         {/*        <div className="flex items-center space-x-2 text-xl border-2 p-3 rounded-lg">*/}
  //         {/*          <FaWifi color="#14B8A5" />*/}
  //         {/*          <span> Wifi</span>*/}
  //         {/*        </div>*/}
  //         {/*        <div className="flex items-center space-x-2  text-xl border-2 p-3 rounded-lg">*/}
  //         {/*          <FaBath color="#14B8A5" />*/}
  //         {/*          <span>Bathroom</span>*/}
  //         {/*        </div>*/}
  //         {/*        <div className="flex items-center space-x-2  text-xl border-2 p-3 rounded-lg">*/}
  //         {/*          <SiNetflix color="#14B8A5" />*/}
  //         {/*          <span>Netflix</span>*/}
  //         {/*        </div>*/}
  //         {/*      </div>*/}
  //         {/*      <div className="text-lg space-y-2">*/}
  //         {/*        <div className="flex items-center space-x-2 text-xl border-2 p-3 rounded-lg">*/}
  //         {/*          <FaSwimmingPool color="#14B8A5" />*/}
  //         {/*          <span> Pool</span>*/}
  //         {/*        </div>*/}
  //         {/*        <div className="flex items-center space-x-2 text-xl border-2 p-3 rounded-lg">*/}
  //         {/*          <FaTree color="#14B8A5" />*/}
  //         {/*          <span>Garden</span>*/}
  //         {/*        </div>*/}
  //         {/*        <div className="flex items-center space-x-2 text-xl border-2 p-3 rounded-lg">*/}
  //         {/*          <FaUtensils color="#14B8A5" />*/}
  //         {/*          <span>Kitchen</span>*/}
  //         {/*        </div>*/}
  //         {/*      </div>*/}
  //         {/*    </div>*/}
  //         {/*  </div>*/}
  //         {/*</div>*/}
  //         {/* FeaturesCard */}
  //         <div className="space-y-2 mt-6 sm:mt-0 ">
  //           <div className="bg-white p-6 rounded-lg shadow-md w-2/3 mx-auto">
  //             <div className="flex items-center justify-between">
  //               <p className="text-gray-500">{assetId}</p>
  //               {/*<HeartIcon*/}
  //               {/*  className="h-6 w-6 cursor-pointer transform transition-all ease-in-out*/}
  //               {/*  hover:animate-bounce"*/}
  //               {/*  color="#14B8A5"*/}
  //               {/*  fill={`${isFavorite === false ? "#fff" : "#14b8a5"}`}*/}
  //               {/*  onClick={() => handleFavoriteInformationIcon()}*/}
  //               {/*/>*/}
  //             </div>
  //             <div className="border-r-2 border-l-2 border-1 border-teal-500 w-fit px-1 mt-1">
  //               <p className="text-gray-500">{information.beschreibung}</p>
  //             </div>
  //             <p className="pt-1 text-gray-500">{information.beschreibung} guests</p>
  //             <p className="text-gray-500 pt-1">{information.beschreibung}</p>
  //             <p className="pt-1 text-gray-500">{information.beschreibung}</p>
  //             <p className="pt-2 text-end">
  //               {" "}
  //               <span className="font-bold text-lg"> {information.beschreibung}₺ </span> /
  //               <span className="text-sm"> Night </span>
  //             </p>
  //           </div>
  //
  //           <div className="bg-white p-4 rounded-lg shadow-md w-2/3 mx-auto">
  //             <p className="text-gray-800 font-semibold pt-1 pb-2 px-1">Cost</p>
  //             <div className="border border-1 border-gray-200 my-1" />
  //             <div className="flex justify-between items-center space-y-1 pt-2 px-1">
  //               <p className="text-gray-500">
  //                 {/*{selectedDayCount} x {information.beschreibung}₺*/}
  //               </p>
  //               <p className="text-gray-500 font-semibold">
  //                 {/*{selectedDayCount * information.beschreibung}₺*/}
  //               </p>
  //             </div>
  //             <div className="flex justify-between items-center space-y-1 pb-2 px-1">
  //               <p className="text-gray-500">Fee</p>
  //               <p className="text-gray-500 font-semibold">100₺</p>
  //             </div>
  //             <div className="border border-1 border-gray-200 my-1" />
  //             <div className="flex justify-between px-1 items-center pt-2">
  //               <p className="font-semibold">Total Amount</p>
  //               {/*<p className="font-bold text-lg">*/}
  //               {/*  {selectedDayCount * information.beschreibung + 100}₺*/}
  //               {/*</p>*/}
  //             </div>
  //             <div className="text-center mt-6">
  //               <button
  //                 className="mx-auto px-4 py-1 rounded-lg font-bold bg-teal-500 shadow-md
  //                   hover:scale-105 hover:shadow-lg transform transition-all duration-200 ease-in-out
  //                   text-gray-50"
  //                 onClick={() => goToNextPhase()}
  //               >
  //                 Reserve
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       {/*<div className="mt-[900px] sm:mt-96 lg:mt-42 p-6">*/}
  //       {/*  <div className="hidden sm:inline">*/}
  //       {/*    <DateRange*/}
  //       {/*      ranges={[selectionRange]}*/}
  //       {/*      minDate={new Date()}*/}
  //       {/*      rangeColors={["#14B8A5"]}*/}
  //       {/*      months={2}*/}
  //       {/*      disabledDates={information.reservedDates.map((d) => new Date(d))}*/}
  //       {/*      direction="horizontal"*/}
  //       {/*      onChange={handleSelectDate}*/}
  //       {/*    />*/}
  //       {/*  </div>*/}
  //       {/*  <div className="sm:hidden text-center">*/}
  //       {/*    <DateRange*/}
  //       {/*      ranges={[selectionRange]}*/}
  //       {/*      minDate={new Date()}*/}
  //       {/*      rangeColors={["#14B8A5"]}*/}
  //       {/*      disabledDates={information.reservedDates.map((d) => new Date(d))}*/}
  //       {/*      direction="horizontal"*/}
  //       {/*      onChange={handleSelectDate}*/}
  //       {/*    />*/}
  //       {/*  </div>*/}
  //       {/*</div>*/}
  //     </div>
  //
  //     {isOpen && (
  //       <ImageDialog
  //         imageUrl={selectedImage}
  //         isOpen={isOpen}
  //         closeModal={closeModal}
  //         isRemoveBtnExist={false}
  //       />
  //     )}
  //   </div>
  // );
}



export default InformationDetail;
