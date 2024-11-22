import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudent, updateStudent } from "../Api";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: "", age: "", favorite_food: "" });
  const [editCount, setEditCount] = useState(0);

  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const foodRef = useRef(null);

  useEffect(() => {
    async function fetchStudent() {
      const data = await getStudent(id);
      setStudent(data);
    }
    fetchStudent();
  }, [id]);

  const validateForm = () => {
    let isValid = true;

    if (!student.name.trim()) {
      nameRef.current.focus();
      alert("이름을 입력하세요");
      isValid = false;
    } else if (!student.age.trim() || isNaN(student.age)) {
      ageRef.current.focus();
      alert("유효한 나이를 입력하세요");
      isValid = false;
    } else if (!student.favorite_food.trim()) {
      foodRef.current.focus();
      alert("좋아하는 음식을 입력하세요");
      isValid = false;
    }

    return isValid;
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));

    setEditCount((prevCount) => prevCount + 1);
  }

  async function handleUpdate(event) {
    event.preventDefault();

    if (!validateForm()) return;

    await updateStudent(id, student);
    navigate("/list");
  }

  return (
    <div>
      <h2>학생 정보 수정</h2>
      <p>총 수정 횟수: {editCount}</p>

      <form onSubmit={handleUpdate}>
        <div>
          <label>이름:</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            ref={nameRef}
          />
        </div>
        <div>
          <label>나이:</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            ref={ageRef}
          />
        </div>
        <div>
          <label>좋아하는 음식:</label>
          <input
            type="text"
            name="favorite_food"
            value={student.favorite_food}
            onChange={handleChange}
            ref={foodRef}
          />
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default Update;
