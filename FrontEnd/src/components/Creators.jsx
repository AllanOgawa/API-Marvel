/* eslint-disable react/prop-types */
import '../styles/Creators.scss'

export default function Creators({ data, onClick }) {
    return (
      <div className="creators">
        {data.map((dataItem) => {
          // Construa a URL da imagem
          const imageUrl = dataItem.thumbnail;
          
          return (
            <div
              key={dataItem.id}
              className="creatorsCard"
              style={{
                background: `url(${imageUrl}) no-repeat center`,
                backgroundSize: "cover",
              }}
              onClick={() => onClick(dataItem.id)}
            >
              <div className="caption">{dataItem.fullName}</div>
              <div className="caption bottom">View Comics</div>
            </div>
          );
        })}
      </div>
    );
}