import React, { useState, useEffect } from 'react';
import CustomForm from './CustomForm';

const UpdateFicheModal = ({ isOpen, onClose, onSubmit, fiche }) => {
    const [formData, setFormData] = useState({
        title: fiche.title || '',
        definitions: fiche.definitions || '',
        datesFacts: fiche.datesFacts || '',
        formulas: fiche.formulas || '',
        diagrams: fiche.diagrams || '',
        summaries: fiche.summaries || '',
        questions: fiche.questions || '',
        citations: fiche.citations || '',
        tips: fiche.tips || '',
        mnemonics: fiche.mnemonics || ''
    });

    useEffect(() => {
        if (fiche) {
            setFormData({
                title: fiche.title || '',
                definitions: fiche.definitions || '',
                datesFacts: fiche.datesFacts || '',
                formulas: fiche.formulas || '',
                diagrams: fiche.diagrams || '',
                summaries: fiche.summaries || '',
                questions: fiche.questions || '',
                citations: fiche.citations || '',
                tips: fiche.tips || '',
                mnemonics: fiche.mnemonics || ''
            });
        }
    }, [fiche]);

    const handleFieldChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    const fields = [
        { name: 'title', type: 'text', value: formData.title, placeholder: 'Titre ou Sujet' },
        { name: 'definitions', type: 'text', value: formData.definitions, placeholder: 'Définitions Clés' },
        { name: 'datesFacts', type: 'text', value: formData.datesFacts, placeholder: 'Dates et Faits Importants' },
        { name: 'formulas', type: 'text', value: formData.formulas, placeholder: 'Formules' },
        { name: 'diagrams', type: 'text', value: formData.diagrams, placeholder: 'Diagrammes ou Schémas' },
        { name: 'summaries', type: 'text', value: formData.summaries, placeholder: 'Résumés ou Synthèses' },
        { name: 'questions', type: 'text', value: formData.questions, placeholder: 'Questions de Révision ou Quiz' },
        { name: 'citations', type: 'text', value: formData.citations, placeholder: 'Citations ou Références' },
        { name: 'tips', type: 'text', value: formData.tips, placeholder: 'Conseils ou Méthodes' },
        { name: 'mnemonics', type: 'text', value: formData.mnemonics, placeholder: 'Mnémoniques' }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg text-black">
                <CustomForm
                    fields={fields}
                    onChange={handleFieldChange}
                    onSubmit={handleFormSubmit}
                    submitLabel="Mettre à jour"
                />
                <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2 mt-2">
                    Annuler
                </button>
            </div>
        </div>
    );
};

export default UpdateFicheModal;
