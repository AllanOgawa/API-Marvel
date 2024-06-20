/* eslint-disable react/prop-types */
import "../styles/Characters.scss";

export default function Characters({ data, onClick }) {
  return (
    <div className="characters">
      {data.map((dataItem) => {
        // Construa a URL da imagem
        const imageUrl = dataItem.thumbnail;
        
        return (
          <div
            key={dataItem.id}
            className="characterCard"
            style={{
              background: `url(${imageUrl}) no-repeat center`,
              backgroundSize: "cover",
            }}
            onClick={() => onClick(dataItem.id)}
          >
            <div className="caption">{dataItem.name}</div>
            <div className="caption bottom">View Comics</div>
          </div>
        );
      })}
    </div>
  );
}
