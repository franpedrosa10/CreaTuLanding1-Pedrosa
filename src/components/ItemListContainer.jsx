const ItemListContainer = ({ mensaje }) => {
  return (
    <div style={styles.container}>
      <h2>{mensaje}</h2>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "8rem",  
  }
};

export default ItemListContainer;
