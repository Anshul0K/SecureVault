const Card = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-2xl">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl">{value}</p>
    </div>
  );
};

export default Card;
