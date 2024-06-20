/* eslint-disable react/prop-types */
import "../styles/Comics.scss";

export default function Comics({ data, onClick }) {
  return (
    <div className="comics">
      {data.map((dataItem) => {
        // Construa a URL da imagem
        const imageUrl = dataItem.thumbnail;
        
        return (
          <div
            key={dataItem.id}
            className="comicCard"
            style={{
              background: `url(${imageUrl}) no-repeat center`,
              backgroundSize: "cover",
            }}
            onClick={() => onClick(dataItem.id)}
          >
            <div className="caption">{dataItem.title}</div>
            <div className="caption bottom">View Characters</div>
          </div>
        );
      })}
    </div>
  );
}
