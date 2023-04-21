import filtersStore from '../redux'

const queryReset = () => {
    filtersStore.dispatch({ type: 'RESET_FILTERS' });
};

export default queryReset;