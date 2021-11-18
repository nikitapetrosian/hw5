import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router";
import { Link, Route } from "react-router-dom";
import api from "../api";
import EditUser from "./edit";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const UserId = () => {
    const params = useParams();
    const { id } = params;
    const allUsers = api.users.fetchAll();
    const user = allUsers.find((el) => {
        return el._id === id;
    });
    const usersOptions = allUsers.map((el) => {
        return { value: el.name, label: el.name };
    });
    const defaultUser = { value: "Выберите пользователя", label: "Выберите пользователя" };
    const [data, setData] = useState({
        id: user._id,
        name: user.name,
        email: user.email,
        sex: user.sex,
        profession: user.profession.name,
        qualities: user.qualities,
        completedMeetings: user.completedMeetings,
        rate: user.rate
    });
    const [commentDefault, setCommentDefault] = useState([]);
    const [comentForUser, setComentForUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((userEdit) => setData({
            id: userEdit._id,
            name: userEdit.name,
            email: userEdit.email,
            sex: userEdit.sex,
            profession: userEdit.profession.name,
            qualities: userEdit.qualities,
            completedMeetings: userEdit.completedMeetings,
            rate: userEdit.rate
        }));
        console.log("kkk");

        api.comments.default.fetchAll().then((el) => setCommentDefault(el));
        api.comments.default.fetchCommentsForUser(id).then((el) => setComentForUser(el));
    }, []);

    const comentators = commentDefault.map((com) => allUsers.find((el) => {
        return el._id === com.userId;
    }));
    console.log(comentators);
    console.log(comentForUser);
    const { path, url } = useRouteMatch();
    function randomInteger(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }
    // const r = (Math.random() + 1).toString(36).substring(9);
    const [src] = useState(`https://avatars.dicebear.com/api/avataaars/${randomInteger(1, 2)}.svg`);
    const { control, handleSubmit, register } = useForm();

    const nameId = (id) => {
        let user = "";
        allUsers.find((el) => {
            user = el;
            return user;
        });
        return user.name;
    };
    const onSubmit = async (data) => {
        console.log(data);
        const user = allUsers.find((el) => {
            return el.name === data.user.value;
        });
        const newData = {
            pageId: id,
            userId: user._id,
            content: data.comment
        };
        const newCom = await api.comments.default.add(newData);

        console.log(newCom);
        setComentForUser((prev) => {
            return [...prev, newCom];
        });
    };
    const handleDelete = async (id) => {
        console.log(id);
        const updateCom = await api.comments.default.remove(id);
        setComentForUser(updateCom);
    };
    return <>
        <Route exact path={path}>
            {user ? <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                                    <i>
                                        <Link to={`${url}/edit`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                            </svg>
                                        </Link>
                                    </i>
                                </button>
                                <div className="d-flex flex-column align-items-center text-center position-relative">
                                    <img
                                        src={src}
                                        className="rounded-circle shadow-1-strong me-3"
                                        alt="avatar"
                                        width="150"
                                        height="150"
                                    />
                                    <div className="mt-3">
                                        <h4>{data.name}</h4>
                                        <p className="text-secondary mb-1">{data.profession}</p>
                                        <div className="text-muted">
                                            <i role="button">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill text-primary" viewBox="0 0 16 16">
                                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                                </svg>
                                            </i>
                                            <i role="button">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill text-secondary" viewBox="0 0 16 16">
                                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                                </svg>
                                            </i>
                                            <span className="ms-2">{data.rate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Qualities</span>
                                </h5>
                                <div className="card-text">
                                    <h3>{data.qualities.map((quality) => (
                                        <span
                                            className={`p-1 m-2 bg-${quality.color} text-white smallText `}
                                            key={quality._id}
                                        >
                                            {quality.name}
                                        </span>
                                    ))}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Completed meetings</span>
                                </h5>

                                <h1 className="display-1">{data.completedMeetings}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card mb-2">
                                {" "}
                                <div className="card-body ">
                                    <h1>новый комментарий</h1>
                                    <Controller
                                        control={control}
                                        name="user"
                                        defaultValue={defaultUser}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                value={value}
                                                onChange={onChange}
                                                options={usersOptions}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                            />
                                        )}
                                    />
                                    <br />
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label m-0">Сообщение</label>
                                    <textarea {...register("comment")} type="text" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button className="btn btn-primary mt-2" type="submit">Опубликовать</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="bg-light card-body  mb-3">
                            <div className="row">
                                <div className="col">
                                    {comentForUser !== undefined ? comentForUser.map((comment) => (
                                        <div className="d-flex flex-start " key={comment._id}>
                                            <img
                                                src={src}
                                                className="rounded-circle shadow-1-strong me-3"
                                                alt="avatar"
                                                width="65"
                                                height="65"
                                            />
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div className="mb-4">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1 ">
                                                            {nameId(comment.userId)}
                                                            <span className="small">
                                                                {new Date(Number(comment.created_at)).toLocaleString()}
                                                            </span>
                                                        </p>
                                                        <button className="btn btn-sm text-primary d-flex align-items-center"
                                                            onClick={() => handleDelete(comment._id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                                                <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <p className="small mb-0">{comment.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )) : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div> : <h2>loading</h2>}
        </Route>
        <Route path={`${path}/:edit`} component={EditUser} />

    </>;
};
export default UserId;
