import { ref, watch } from 'vue';

const LOAD_IMAGE_EVENT_TYPE = 'loadImage';


const eventTypes = {
	image: LOAD_IMAGE_EVENT_TYPE
} as const;

interface UseIntersectionObserverInterface {
	type: 'image';
	lazy: boolean;
	threshold: number
}

let observer: IntersectionObserver | null = null;
const useIntersectionObserver = ({ type, lazy, threshold = 1 }: UseIntersectionObserverInterface) => {
	const loaded = ref<boolean>(false);
	const $ref = ref<HTMLElement | null>(null);

	const onIntersection = (entries: IntersectionObserverEntry[], o: IntersectionObserver) => {
		entries.forEach((entry: IntersectionObserverEntry) => {
			if (entry.isIntersecting) {
				o.unobserve(entry.target);
				entry.target.dispatchEvent(new CustomEvent(eventTypes[type]));
			}
		});
	};

	watch(() => [type, $ref], () => {
		if (type !== 'image') return;

		if (!lazy) {
			loaded.value = true;
			return;
		}

		const handleLoadImage = () => {
			loaded.value = true;
		}

		if ($ref.value) {
			$ref.value.addEventListener(eventTypes[type], handleLoadImage);
		}
	}, { immediate: true, deep: true })

	watch(() => [lazy, $ref], () => {
		if (!lazy) return;

		if (!observer) {
			observer = new IntersectionObserver(onIntersection, { threshold })
		}

		if ($ref.value) {
			observer.observe($ref.value);
		}
	}, { immediate: true, deep: true })

	return {
		loaded,
		$ref
	}
};

export default useIntersectionObserver;