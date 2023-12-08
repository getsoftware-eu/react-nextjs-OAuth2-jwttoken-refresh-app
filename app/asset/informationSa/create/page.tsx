"use client"
// import UserService from "/services/UserService";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
// import {toast} from "react-hot-toast";
import SideNav from "/components/common/nav/SideNav";
import AppTopNav from "../../../AppTopNav";
import {H1} from "/components/common/Сontent";
import FooterNav from "/components/common/nav/FooterNav";
import useAxiosAuth from "../../../../lib/hooks/useAxiosAuth";
import {AssetDTO, UserDTO} from "../../../../types/interfacesDTO";

//TODO extract global method
function createPostFormData(asset: AssetDTO) {
  const json = JSON.stringify(asset);
  const blob = new Blob([json], {
    type: "application/json",
  });
  let formData = new FormData();
  formData.append("asset", blob);
  return formData;
}

function CreateInformation({ props }) {
  const { data: session } = useSession();
  const router = useRouter();
  const axiosAuth = useAxiosAuth();

  //TODO const informationService = new InformationService(session);

  const [assets, setAssets] = useState();

  const formBtnRef = useRef(null); //btn form action

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchPost = async (formData: any) => {
    const res = await axiosAuth.post("/api/v1/asset/informations/", formData);

    let serverAssetArray = res.data;
    if (Array.isArray(serverAssetArray)) {
      setAssets(serverAssetArray);
    }
  };
  
  const onSubmit = (data: any) => {

    let _user: UserDTO = null;
    
    let _asset: AssetDTO = {
      entityId: data.entityId,
      name: data.name,
      saStatus: data.saStatus,
      sbStatus: data.sbStatus,
      ownerId: null,
      vertreterId: null,
      editorId: null,
      beschreibung: data.beschreibung,
      canEdit: data.canEdit
    };

    let formData = createPostFormData(_asset);

    // toast.promise(
    //     //TODO informationService.save(formData)
    //     axiosAuth
    //     .post("/api/v1/asset/informations/", formData, {
    //           headers: {
    //             'Content-Type':'multipart/form-data',  
    //           },
    //         })
    //         .then((res) => {
    //     if(res.status === 200)
    //       router.push("/asset/informationSa/detail/" + res.data.entityId);
    //   }),
    //   {
    //     loading: 'Your information is saving...',
    //     success: <b>Information saved!</b>,
    //     error: <b>Could not save.</b>,
    //   },{
    //     style: {
    //       border: '1px solid #14b8a5',
    //       padding: '16px',
    //       color: '#14b8a5',
    //     },
    //     iconTheme: {
    //       primary: '#14b8a5',
    //       secondary: '#FFFAEE',
    //     },
    //   }
    // )
  };

  /**
  //Eu: reaction of changed select from
  const handleSelectCategory = (categoryId) => {
    let category = categories.filter(
      (item) => item.categoryId == categoryId
    )[0];
    setSelectedCategory(category);//useState
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  **/
  
  return (
      <>
        <div className="wrapper">
          <SideNav />
          <div className="main">
            <AppTopNav/>
            <main className="content">
              <div className="container-fluid">
                <div className="header">
                  <H1 text="Strukturanalyse" />
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="/asset/informationSa/list">Informationen</a></li>
                      <li className="breadcrumb-item active" aria-current="page">neue Information</li>
                    </ol>
                  </nav>                
                </div>
                {/*<#nested />*/}
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <form id="assetForm"
                            className=""
                            onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="row mb-3">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10 error-placeholder">
                              {/*<input type="text" className="form-control" id="name" name="name" placeholder="Name" value="${(asset.name)!}">*/}
                              <input type="text" id="name" placeholder="Name"
                                     {...register("name", {
                                       required: "Please enter name",
                                     })}
                                     className="form-control disableable"
                              />
                              {/*<p className="text-[#ed6172] font-semibold px-2">*/}
                              {/*  {errors.name?.message}*/}
                              {/*</p>*/}
                            </div>
                          </div>
                                
                          <div className="row mb-3">
                            <label htmlFor="beschreibung" className="col-sm-2 col-form-label">Beschreibung</label>
                            <div className="col-sm-10 error-placeholder">
                              {/*<input type="text" className="form-control" id="name" name="name" placeholder="Name" value="${(asset.name)!}">*/}
                              <input type="text" id="beschreibung" placeholder="Beschreibung"
                                     {...register("beschreibung", {
                                       // required: "Please enter beschreibung",
                                     })}
                                     className="form-control"
                              />
                              {/*<p className="text-[#ed6172] font-semibold px-2">*/}
                              {/*  {errors.beschreibung?.message}*/}
                              {/*</p>*/}
                            </div>
                          </div>
                          
                          {/*Eugen: inside form submit*/}
                          <button type="submit" className="btn btn-primary" ref={formBtnRef}>speichern</button>

                          <a className="btn btn-light" href="/asset/informationSa/list" >zurück</a>

                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            {/*<@footer />*/}
            <FooterNav />
          </div>
        </div>
      </>
  )
}


export default CreateInformation;
