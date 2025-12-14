import './DescriptionModal.css';

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const DescriptionModal = ({ isOpen, onClose, title, description }: DescriptionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="desc-modal-overlay" onClick={onClose}>
      <div className="desc-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="desc-modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="desc-close-btn">&times;</button>
        </div>
        <div className="desc-modal-body">
          <label>Description</label>
          <p>{description || "No description provided."}</p>
        </div>
        <div className="desc-modal-footer">
          <button onClick={onClose} className="desc-close-action-btn">Close</button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;