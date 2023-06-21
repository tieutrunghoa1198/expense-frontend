import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/handlers/user.service";
import { useForm } from "react-hook-form";


const UserDetail = () => {

    const [user] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        if (user) {
            setValue("fullname", user.fullname);
            setValue("username", user.username);
            setValue("email", user.email);
            setImageUrl(user.pfpImageLink);
        }
    }, [user, setValue]);

    const handleImageChange = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setSelectedImage(file);
                setImagePreview(reader.result);
            };
        } else {
            setSelectedImage(null);
            setImagePreview(null);
        }
    };

    const onSubmit = async (data) => {
        console.log(data);
        // TODO: Save the user data to the backend
        const formData = new FormData();
        if (selectedImage) {
            formData.append("image", selectedImage);
        }
        formData.append("fullname", data.fullname);
        formData.append("username", data.username);
        formData.append("email", data.email);

        try {
            await userService.updateUserInfo(formData);
            //toast.success("Update user info successfully!");

            // ...
        } catch (error) {
            // ...
            //toast.error("Update user info failed!");
        }
    };
    return (
        <div className="container snippet">
         
            <div className="row">
                <div className="col-md-10">
                    <h1>User Profile</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="text-center">
                        {
                            imageUrl ? (<img
                                src={imagePreview || `http://localhost:8080/account/image?id=${user.id}`}
                                className="avatar img-circle img-thumbnail"
                                alt="avatar"
                            />) : (<img
                                src={imagePreview || ""}
                                className="avatar img-circle img-thumbnail"
                                alt="avatar"
                            />)
                        }


                        <h6>Upload your photo...</h6>
                        <input
                            type="file"
                            className="text-center center-block file-upload"
                            onChange={(e) => handleImageChange(e.target.files[0])}
                        />
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="tab-pane active" id="home">
                        <form className="form"
                            onSubmit={handleSubmit(onSubmit)}
                            id="registrationForm" >
                            <div className="form-group">
                                <div className="col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register("fullname", { required: true, pattern: /^[A-Za-z]+$/ })}
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register("username", { required: true, pattern: /^[A-Za-z]+$/ })}
                                        placeholder="User Name"
                                    />
                                </div>
                            </div>
                    
                            <br></br>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <input
                                        type="email"
                                        className="form-control"
                                        {...register("email", { required: true })}
                                        placeholder="you@gmail.com" disabled
                                    />
                                </div>
                            </div>
                           
                            <br></br>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <button
                                        style={{ margin: 20 }}
                                        className="btn btn-lg btn-success"
                                        type="submit"
                                    >
                                        <i className="glyphicon glyphicon-ok-sign"></i> Save
                                    </button>
                                    <button style={{ margin: 20 }} className="btn btn-lg btn-dark" type="reset"
                                        onClick={() => reset()}>
                                        <i className="glyphicon glyphicon-repeat"></i> Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}



export default UserDetail;