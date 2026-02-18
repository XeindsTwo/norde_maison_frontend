import "./Materials.scss"

const Materials = () => (
  <section className="materials">
    <div className="container container--padding">
      <h2 className="materials__title">Материалы</h2>
      <p className="materials__text">
        Мы используем органический хлопок, шерсть и лён. <br/>
        Без синтетики и лишней обработки — только ткани, которые дышат,
        держат форму и со временем становятся лучше.
      </p>
      <ul className="materials__list">
        <li>100% органический хлопок</li>
        <li>Шерсть мериноса</li>
        <li>Кашемир</li>
        <li>Шёлк</li>
        <li>Деним</li>
        <li>Лён</li>
      </ul>
    </div>
  </section>
);

export default Materials;