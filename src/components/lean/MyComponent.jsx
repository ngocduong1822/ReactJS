import "./style.css";
const MyComponent = () => {
    const bien = "duongpromax" ; 
  return(
  <>
    <div>{bien}Hello, DuongNe</div>
    <div className="child"
    style={{ borderRadius:"10px" }}
    >child</div>
  </>
  )
};
export default MyComponent;
