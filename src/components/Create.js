import React, {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {createStudent} from "../Api";

function Create() {
    const navigate = useNavigate();
    const [student, setStudent] = useState({name: "", age: "", favorite_food: ""});

    const nameRef = useRef(null);
    const ageRef = useRef(null);
    const foodRef = useRef(null);

    const validateForm = () => {
        let isValid = true;

        if (!student.name.trim()) {
            nameRef
                .current
                .focus();
            alert("이름을 입력하세요");
            isValid = false;
        } else if (!student.age.trim() || isNaN(student.age)) {
            ageRef
                .current
                .focus();
            alert("유효한 나이를 입력하세요");
            isValid = false;
        } else if (!student.favorite_food.trim()) {
            foodRef
                .current
                .focus();
            alert("좋아하는 음식을 입력하세요");
            isValid = false;
        }

        return isValid;
    };

    function handleChange(event) {
        const {name, value} = event.target;
        setStudent((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!validateForm()) 
            return;
        
        await createStudent(student);
        navigate("/list");
    }

    return (
        <div>
            <h2>학생 추가하기</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름:</label>
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        ref={nameRef}/>
                </div>
                <div>
                    <label>나이:</label>
                    <input
                        type="number"
                        name="age"
                        value={student.age}
                        onChange={handleChange}
                        ref={ageRef}/>
                </div>
                <div>
                    <label>좋아하는 음식:</label>
                    <input
                        type="text"
                        name="favorite_food"
                        value={student.favorite_food}
                        onChange={handleChange}
                        ref={foodRef}/>
                </div>
                <button type="submit">학생 추가</button>
            </form>
        </div>
    );
}

export default Create;
