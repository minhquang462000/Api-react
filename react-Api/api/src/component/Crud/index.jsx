import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CrudComponent = () => {
  const [user, setUser] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputAge, setInputAge] = useState("");

  //   call Api == axios
  async function callApiUser() {
    const res = await axios.get("http://localhost:3000/users");
    setUser(res.data);
  }
  useEffect(() => {
    callApiUser();
    console.log("q");
  }, []);
  const handChangeInputName = (e) => {
    setInputName(e.target.value);
  };
  const handChangeInputAge = (e) => {
    setInputAge(e.target.value);
  };
  const handleCreate = async () => {
    if (inputName != "" && inputAge != "") {
      const data = await axios.post("http://localhost:3000/users", {
        name: inputName,
        age: inputAge,
      });
      setInputAge("");
      setInputName("");
      callApiUser();
    } else {
      alert("Không có thông tin input");
    }
  };

  const deleteItem = async (item) => {
    const deleteDataItem = await axios.delete(
      `http://localhost:3000/users/${item.id}`
    );
    callApiUser();
  };
  const editItem = async (item) => {
    const edit = await axios.put(`http://localhost:3000/users/${item.id}`, {
      name: inputName,
      age: inputAge,
    });
    setInputAge(item.age);
    setInputName(item.name);
    console.log(edit);
    callApiUser();
  };
  return (
    <DivElemet>
      <div>
        <InputElement
          placeholder="Name"
          value={inputName}
          onChange={handChangeInputName}
        />

        <InputElement
          placeholder="Age"
          value={inputAge}
          onChange={handChangeInputAge}
          type="number"
        />
      </div>
      <ButtonElement onClick={handleCreate}>Create</ButtonElement>
      <UlElemet>
        <LiElemet>ID</LiElemet>
        <LiElemet>Name</LiElemet>
        <LiElemet>Age</LiElemet>
        <LiElemet>Action</LiElemet>
      </UlElemet>
      {user.map((item) => {
        return (
          <UlElemet>
            <LiElemet>{item.id}</LiElemet>
            <LiElemet>{item.name}</LiElemet>
            <LiElemet>{item.age}</LiElemet>
            <LiElemet>
              <ButtonElement onClick={() => deleteItem(item)}>
                Delete
              </ButtonElement>
              <ButtonElement onClick={() => editItem(item)}>Edit</ButtonElement>
            </LiElemet>
          </UlElemet>
        );
      })}
    </DivElemet>
  );
};
const DivElemet = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LiElemet = styled.li`
  list-style: none;

  display: flex;
  align-items: center;
  margin: auto;
  font-size: 25px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  gap: 5px;
`;
const UlElemet = styled.ul`
  display: grid;
  grid-template-columns: 40px 100px 100px 200px;
`;
const ButtonElement = styled.button`
  background-color: #1997ff;
  color: white;
  margin: 10px 0;
  cursor: pointer;
  border: none;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: red;
  }
`;
const InputElement = styled.input`
  outline: none;
  padding: 5px;
`;

export default CrudComponent;
