// import Interceptor from "@/interceptors/interceptor";

import useAxiosAuth from "../lib/hooks/useAxiosAuth";

function withHooks(WrappedComponent) {
    // eslint-disable-next-line react/display-name
    return function(props) {
        const axiosAuth = useAxiosAuth();
        return (
            < WrappedComponent axiosAuth={axiosAuth} {...props} />
        );
    };
}
class InformationService {
    apiUrl = "/api/v1/asset/informations/"
    axiosAuth  = this.props;


// constructor(session) {
        // this.axiosInstance = new Interceptor(session).getInstance();
        // this.axiosAuth = useAxiosAuth();
    // }

    getAll() {
        return this.axiosAuth.get(this.apiUrl + "");
    }
     
    getByUserId(userId) {
        return this.axiosAuth.get(this.apiUrl + "user/"+userId);
    }
    
    getById(informationId) {
        return this.axiosAuth.get(this.apiUrl + informationId);
    }
    
    save(formData) {
        return this.axiosAuth.post(this.apiUrl + "save", formData, {
            headers: {
                'Content-Type':'multipart/form-data', //TODO json
            },
        });
    } 
    
    update(formData, entityId) {
        return this.axiosAuth.post(this.apiUrl + entityId + "/update", formData, {
            headers: {
                'Content-Type':'multipart/form-data', //TODO json
            },
        });
    }

    delete(information) {
        return this.axiosAuth.post(this.apiUrl + "removeOne", information)
    }

    createInformation(informationDto) {
        return this.axiosAuth.post(this.apiUrl + "create", informationDto)
    }
}

export default withHooks(InformationService);
