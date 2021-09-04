import React, { useState } from "react";
import api from "../api";
import { FavoriteBtn } from "./favoriteBtn";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const onDelete = (id) => {
        const newArr = users.filter((user) => user._id !== id);
        setUsers(newArr);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const count = users.length;
    const pageSize = 4;
    const handlePageCgange = (pageIndex) => {
        // console.log(pageIndex);
        setCurrentPage(pageIndex);
    };
    const userCrop = paginate(users, currentPage, pageSize);
    return (
        <>
            <h1>
                <span className="badge bg-secondary">
                    {users?.length ? `с тобой тусует ${count}` : "никого нет"}
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

            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageCgange}
            />
        </>
    );
};

export default Users;
