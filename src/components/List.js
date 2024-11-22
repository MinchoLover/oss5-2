import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getStudents, deleteStudent} from "../Api";
import Header from './Header';

function List() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchStudents() {
            const data = await getStudents();
            setStudents(data);
        }
        fetchStudents();
    }, []);

    async function handleDelete(id) {
        await deleteStudent(id);
        setStudents(students.filter((student) => student.id !== id));
    }

    return (
        <> < Header /> <div className="container my-5">
            <h2 className="text-center mb-4">학생 리스트</h2>
            <Link to="/create">
                <button className="btn btn-primary btn-sm mb-3">
                    학생 추가하기
                </button>
            </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>나이</th>
                        <th>좋아하는 음식</th>
                        <th>작업</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                                <td>{student.favorite_food}</td>
                                <td>
                                    {/* 수정 버튼 */}
                                    <Link to={`/update/${student.id}`}>
                                        <button className="btn btn-primary btn-sm mb-3 mr-3">
                                            수정
                                        </button>
                                    </Link>

                                    {/* 삭제 버튼 */}
                                    <button
                                        onClick={() => handleDelete(student.id)}
                                        className="btn btn-danger btn-sm ml-3">
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </>
    );
}

export default List;
