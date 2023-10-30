import Toast from 'react-native-root-toast';
import tailwindConfig from "../../tailwind.config";

export default ToastNotification = (message, status, position) => {

	const tailwindColors = tailwindConfig.theme.colors;

	if (status === 'success') {
		return (
			Toast.show(message, {
				duration: Toast.durations.LONG,
				backgroundColor: tailwindColors.success,
				position: position == 'top' ? -660 : Toast.positions.BOTTOM,
			})
		)
	} else if (status === 'error') {
		return (
			Toast.show(message, {
				duration: Toast.durations.LONG,
				backgroundColor: tailwindColors.error,
			})
		)
	} else {
		return (
			Toast.show(message, {
				duration: Toast.durations.LONG,
			})
		)
	}

}