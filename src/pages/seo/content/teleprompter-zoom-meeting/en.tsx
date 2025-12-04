export const TeleprompterZoomMeetingEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">How to Use Teleprompter for Zoom, Teams and Google Meet</h1>

        <p className="mb-6">
            Maintaining eye contact during an online presentation is hard. If you look at your notes, you lose connection with the audience. If you look at the camera, you forget what to say. PromptNinja solves this, allowing you to read your script while looking directly at the camera lens.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">The "Wandering Eye" Problem in Video Calls</h2>
        <p className="mb-4">
            In important sales meetings, job interviews, or executive presentations, confidence is conveyed through eye contact. Reading a script from paper or a side window makes you look unprepared, robotic, or insecure.
        </p>
        <p className="mb-4">
            The technical solution is simple but requires correct positioning: place the text <strong>as close to the webcam as possible</strong>.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Ultimate Step-by-Step for Online Meetings</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-4 text-slate-300">
                <li>
                    <strong>Window Positioning:</strong> Open PromptNinja in your browser and resize the window to be narrow. Drag it to the top of the screen, centered right below your physical webcam.
                </li>
                <li>
                    <strong>Text Configuration:</strong> Increase the font size and decrease the margin width. This makes your eyes move less from left to right, disguising the reading.
                </li>
                <li>
                    <strong>Invisible Remote Control:</strong> Don't touch the mouse or keyboard! The clicking sound is distracting, and shoulder movement reveals you are operating the computer. Use your phone as a silent remote control (just scan the QR Code).
                </li>
                <li>
                    <strong>Transparency (Pro Tip):</strong> If you need to see slides or other people's faces while speaking, reduce the teleprompter window width so it occupies only a narrow strip at the top, leaving the rest of the screen free.
                </li>
            </ol>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Works on any video conferencing platform</h2>
        <p className="mb-6">
            Since PromptNinja runs in the browser, it is universally compatible. You don't need plugins or complex integrations. It works as a layer "above" your meeting.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Zoom:</strong> Ideal for webinars and classes.</li>
            <li><strong>Microsoft Teams:</strong> Perfect for corporate meetings.</li>
            <li><strong>Google Meet:</strong> Great for quick calls in the browser.</li>
            <li><strong>Skype, Discord, Slack:</strong> Works on any app that uses a camera.</li>
        </ul>
        <p className="mb-6">
            <strong>Important:</strong> You do <em>not</em> need to share your screen for the teleprompter to work. It is a tool for your eyes only. If you need to share your screen, share only the presentation window (PowerPoint/PDF) and keep the teleprompter visible only to you.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Advanced Etiquette and Performance Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-purple-400 mb-2">Lighting</h3>
                <p className="text-sm text-slate-400">Ensure your face is well lit from the front. The reflection of the white teleprompter screen can help light up your face, but a dedicated light is better.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Camera Position</h3>
                <p className="text-sm text-slate-400">The camera should be at eye level. If using a laptop, place books under it. Low camera (looking up your nose) conveys arrogance; high camera conveys submission.</p>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Frequently Asked Questions</h2>
        <dl className="space-y-4">
            <div>
                <dt className="font-bold text-white">Will people know I'm reading?</dt>
                <dd className="text-slate-300">If you position the text very close to the camera and use a large font, your eye movement will be imperceptible. Practice reading with natural intonation.</dd>
            </div>
            <div>
                <dt className="font-bold text-white">Can I record the meeting?</dt>
                <dd className="text-slate-300">Yes! The teleprompter does not appear in the Zoom/Teams recording unless you are recording your entire screen capture instead of just the camera.</dd>
            </div>
        </dl>
    </>
);
