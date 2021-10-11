import React, { useState, useEffect } from "react";
import api from "../api";
import { FavoriteBtn } from "./favoriteBtn";
import { Arrow } from "./arrow";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchForm from "./searchForm";
const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const onDelete = (id) => {
        const newArr = users.filter((user) => user._id !== id);
        setUsers(newArr);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState([]);
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
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
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const onSort = (item) => {
        if (sortBy.iter === item) {
            setSortBy((prevState) => ({ ...prevState, order: prevState.order === "asc" ? "desc" : "asc" }));
        } else {
            setSortBy({ iter: item, order: "asc" });
        }
    };
    const filterPosts = (posts, query) => {
        if (!query) {
            return posts;
        }

        return posts.filter((post) => {
            const postName = post.name.toLowerCase();
            return postName.includes(query);
        });
    };
    const posts = api.users.fetchAll();
    const { search } = window.location;
    const query = new URLSearchParams(search).get("search");
    const [searchQuery, setSearchQuery] = useState(query || "");
    const filteredPosts = filterPosts(posts, searchQuery);
    console.log(searchQuery);
    return (
        <>
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
                            Очистить фильтр
                        </button>
                    </div>
                )}

                <div className="d-flex flex-column">
                    <h1>
                        <span className="badge bg-secondary">
                            {users?.length ? `с тобой тусует ${filteredUsers.length}` : "никого нет"}
                        </span>
                    </h1>
                    <div>
                        <SearchForm
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    </div>
                    <table className="table">

                        <thead>
                            <tr>
                                <th onClick={() => { onSort("name"); }} scope="col">Имя
                                    <Arrow />
                                </th>
                                <th scope="col">Качества</th>
                                <th onClick={() => { onSort("profession.name"); }} scope="col">Профессия
                                    <Arrow />
                                </th>
                                <th onClick={() => { onSort("completedMeetings"); }} scope="col">Встретился, раз
                                    <Arrow />
                                </th>
                                <th onClick={() => { onSort("rate"); }} scope="col">Оценка
                                    <Arrow />
                                </th>
                                <th onClick={() => { onSort("bookmark"); }} csope="col">Избранное
                                    <Arrow />
                                </th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {searchQuery === "" ? userCrop.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <Link to={`/users/${user._id}`}>
                                            {user.name}
                                        </Link>
                                    </td>
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
                            )) : filteredPosts.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <Link to={`/users/${user._id}`}>
                                            {user.name}
                                        </Link>
                                    </td>
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

        </>
    );
};

export default Users;
