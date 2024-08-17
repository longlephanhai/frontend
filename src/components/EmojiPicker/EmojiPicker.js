import React, { useRef, useEffect } from 'react';
import 'emoji-picker-element';

const EmojiPickerComponent = ({ onEmojiSelect }) => {
    const emojiPickerRef = useRef(null);
    useEffect(() => {
        const emojiPicker = emojiPickerRef.current;
        if (emojiPicker) {
            const handleEmojiClick = (event) => {
                const emoji = event.detail.unicode;
                if (onEmojiSelect) {
                    onEmojiSelect(emoji);
                }
            };
            emojiPicker.addEventListener('emoji-click', handleEmojiClick);

            // Cleanup function to remove event listener
            return () => {
                emojiPicker.removeEventListener('emoji-click', handleEmojiClick);
            };
        }
    }, [onEmojiSelect]);

    return <emoji-picker ref={emojiPickerRef}></emoji-picker>;
};

export default EmojiPickerComponent;
