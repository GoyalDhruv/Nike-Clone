import PropTypes from 'prop-types';

const OrderDetailRow = ({ label, value, customClass = '' }) => (
    <div className={`flex justify-between ${customClass}`}>
        <span className="font-semibold">{label}</span>
        <span className="text-textPrimary">{value}</span>
    </div>
);

OrderDetailRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    customClass: PropTypes.string,
}

export default OrderDetailRow;