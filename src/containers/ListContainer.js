import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';

const mapStateToProps = state => {
  return {
    items: state
  };
};

export const List = connect(mapStateToProps)(ListComponent);
