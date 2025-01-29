export const toast = ({ title, description, variant = 'info' }) => {
    let backgroundColor;

    switch (variant) {
        case 'success':
            backgroundColor = 'green';
            break;
        case 'error':
        case 'destructive':
            backgroundColor = 'red';
            break;
        default:
            backgroundColor = 'blue';
    }

    // Simulated toast notification (replace with a UI library for better UX)
    alert(`[${variant.toUpperCase()}] ${title}: ${description}`);
};
