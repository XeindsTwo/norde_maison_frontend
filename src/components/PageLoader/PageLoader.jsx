import './PageLoader.scss';

const PageLoader = ({visible}) => {
  return (
    <div className={`page-loader ${visible ? 'page-loader--visible' : ''}`}>
      <div className="page-loader__inner">
        <span className="page-loader__dot"/>
        <span className="page-loader__text">Nordé Maison</span>
      </div>
    </div>
  );
};

export default PageLoader;