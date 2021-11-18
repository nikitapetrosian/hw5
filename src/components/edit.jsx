import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useHistory, useParams } from "react-router";
import api from "../api";
import { professions } from "../api/fake.api/professions.api";
import { Controller, useForm } from "react-hook-form";

const EditUser = () => {
    const params = useParams();
    const { id } = params;
    const [localUser, setLocalUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((user) => setLocalUser(user));
    }, []);
    console.log(localUser);
    const { register, handleSubmit, control } = useForm();
    const defaultValueProfession = localUser ? { value: localUser.profession._id, label: localUser.profession.name } : console.log("trable");
    const defaultValueQualities = [];
    localUser ? localUser.qualities.forEach(function (item) {
        defaultValueQualities.push({ value: item._id, label: item.name, color: item.color });
    }) : console.log("trable");

    const allQualities = api.qualities.fetchAll();
    const qualitiesOptions = Object.values(allQualities).map((el) => {
        return { value: el._id, label: el.name, color: el.color };
    });
    const professionsOptions = Object.values(professions).map((el) => {
        return { value: el._id, label: el.name };
    });
    const history = useHistory();
    const onSubmit = (data) => {
        console.log(data.qualities);
        const qualitiesUpdate = data.qualities.map((el) => {
            return { _id: el.value, name: el.label, color: el.color };
        });
        const newData = {
            _id: id,
            name: data.name,
            email: data.email,
            sex: data.sex,
            profession: { _id: data.profession.value, name: data.profession.label },
            qualities: qualitiesUpdate,
            completedMeetings: localUser.completedMeetings,
            rate: localUser.rate
        };
        // console.log(newData);
        api.users.update(id, newData);
        history.push(`/users/${localUser._id}`);
    };
    return (
        <>
            {localUser !== undefined ? <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Edit</h1>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Имя</label>
                    <input {...register("name")} value={localUser.name} type="text" className="form-control" id={id} placeholder={localUser.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Элетронная почта</label>
                    <input {...register("email")} type="email" className="form-control" id={id} placeholder={localUser.email} />
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="exampleFormControlSelect1">Выбери свою профессию</label>
                        <Controller
                            control={control}
                            name="profession"
                            defaultValue={defaultValueProfession}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    value={value}
                                    onChange={onChange}
                                    options={professionsOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            )}
                        />

                    </div>
                    <fieldset className="form-group">
                        <div className="column">
                            <legend className="col-form-label col-sm-4 pt-0">Выберите ваш пол</legend>
                            <div className="d-flex flex-row">
                                <div className="form-check m-3">
                                    <input {...register("sex")} className="form-check-input" type="radio" id="gridRadios1" value="Male" />
                                    <label className="form-check-label" htmlFor="gridRadios1">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check m-3">
                                    <input {...register("sex")} className="form-check-input" type="radio" id="gridRadios2" value="Femail" />
                                    <label className="form-check-label" htmlFor="gridRadios2">
                                        Female
                                    </label>
                                </div>
                                <div className="form-check disabled m-3">
                                    <input {...register("sex")} className="form-check-input" type="radio" id="gridRadios3" value="Other" />
                                    <label className="form-check-label" htmlFor="gridRadios3">
                                        Other
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div>
                        <label htmlFor="exampleFormControlSelect1">Выбери свои качества</label>
                        <Controller
                            control={control}
                            name="qualities"
                            defaultValue={defaultValueQualities}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    isMulti
                                    value={value}
                                    onChange={onChange}
                                    options={qualitiesOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            )}
                        />
                    </div>
                </div>
                <button type="submit"> Обновить</button>

            </form > : <h2>loading</h2>
            }
        </>
    );
};

export default EditUser;
