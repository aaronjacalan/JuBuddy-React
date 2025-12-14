import './BuddyCard.css';

// --- Interfaces (Should ideally be imported from Buddies.jsx or a shared file) ---
interface SharedDataType {
    id: number;
    name: string;
}

interface BuddyData {
    buddyID: number;
    buddyName: string;
    connectionDate: string;
    sharedDataTypes: SharedDataType[];
}

interface BuddyCardProps {
  // Accepts the full buddy data object
  buddy: BuddyData;
}

// Function to determine avatar color based on buddyID for visual variety
const getAvatarColor = (id: number): string => {
    const colors = ['#06D2CA', '#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845'];
    return colors[id % colors.length];
};

// Function to pick an icon based on the shared data type name
const getIconForDataType = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('balance') || lowerName.includes('money')) return '💰';
    if (lowerName.includes('goals') || lowerName.includes('target')) return '🎯';
    if (lowerName.includes('transactions') || lowerName.includes('expense')) return '💸';
    if (lowerName.includes('budget') || lowerName.includes('spending')) return '📊';
    return '✨'; // Default icon
};

function BuddyCard({ buddy }: BuddyCardProps) {
    const { buddyName, connectionDate, sharedDataTypes, buddyID } = buddy;

    // Use a date formatter for readability
    const formattedDate = new Date(connectionDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="buddy-card">
            <div className="buddy-card-header">
                <div
                    className="buddy-avatar"
                    style={{ backgroundColor: getAvatarColor(buddyID) }}
                >
                    {/* Simple initial display using the first letter */}
                    <span className="avatar-letter">
                        {buddyName.charAt(0).toUpperCase()}
                    </span>
                </div>
                <span className="buddy-name">{buddyName}</span>
            </div>

            <div className="buddy-connection-date">
                Connected since: {formattedDate}
            </div>

            <h3 className="shared-data-title">Shared Progress</h3>

            <div className="buddy-content-grid">
                {sharedDataTypes.length > 0 ? (
                    sharedDataTypes.map((dataType) => (
                        <div key={dataType.id} className="buddy-data-item">
                            <span className="data-icon">
                                {getIconForDataType(dataType.name)}
                            </span>
                            <span className="data-name">{dataType.name}</span>
                        </div>
                    ))
                ) : (
                    <div className="empty-data-state">No data shared.</div>
                )}
            </div>
        </div>
    );
}

export default BuddyCard;
