import React, { useState, useEffect } from "react";
import api from "../api";
import { FavoriteBtn } from "./favoriteBtn";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const onDelete = (id) => {
        const newArr = users.filter((user) => user._id !== id);
        setUsers(newArr);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState([]);
    const count = users.length;
    const pageSize = 4;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const handleProffesionSelect = (item) => {
        if (selectedProf.includes(item)) {
            const indexItem = selectedProf.indexOf(item);
            const newArr = [...selectedProf];
            newArr.splice(indexItem, 1);
            console.log(newArr);
            setSelectedProf(newArr);
        } else {
            setSelectedProf([...selectedProf, item]);
            setCurrentPage(1);
        }
    };
    const handlePageChange = (pageIndex) => {
        // console.log(pageIndex);
        setCurrentPage(pageIndex);
    };
    const clearFilter = () => {
        setSelectedProf([]);
    };
    const filteredUsers = selectedProf.length ? users.filter((user) => selectedProf.includes(user.profession.name)) : users;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">

                    <GroupList
                        selectedItems={selectedProf}
                        items={professions}
                        onItemsSelect={handleProffesionSelect}
                    />
                    <button className='btn btn-secondary mt-2'
                        onClick={clearFilter}
                    >
                        Очистить фильр
                    </button>
                </div>
            )}

            <div className="d-flex flex-column">
                <h1>
                    <span className="badge bg-secondary">
                        {users?.length ? `с тобой тусует ${filteredUsers.length}` : "никого нет"}
                    </span>
                </h1>
                <table className="table">

                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th csope="col">Избранное</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {userCrop.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>
                                    {user.qualities.map((quality) => (
                                        <span
                                            className={`p-1 m-2 bg-${quality.color} text-white smallText `}
                                            key={quality._id}
                                        >
                                            {quality.name}
                                        </span>
                                    ))}
                                </td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate}</td>
                                <td>
                                    <FavoriteBtn />
                                </td>
                                <td>
                                    <button
                                        className="badge bg-danger"
                                        onClick={() => onDelete(user._id)}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

        </div>

    );
};

export default Users;
