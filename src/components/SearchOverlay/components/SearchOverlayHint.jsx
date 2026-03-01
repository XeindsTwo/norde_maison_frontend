const SearchOverlayHint = ({
                             isQueryEmpty,
                             products,
                             hasQuery,
                             isLoading
                           }) => {

  if (isQueryEmpty) {
    return <p>Введите запрос, чтобы увидеть результаты</p>;
  }

  if (isLoading) {
    return null;
  }

  if (hasQuery && products.length === 0) {
    return (
      <p className="search-overlay__empty">
        Ничего не найдено. Проверьте написание или попробуйте другой запрос
      </p>
    );
  }

  return null;
};

export default SearchOverlayHint;