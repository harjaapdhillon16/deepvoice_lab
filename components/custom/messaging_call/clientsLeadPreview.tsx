// @ts-nocheck
import { useTranslation } from 'next-i18next'

export default function ClientsLeadsPreview({ clients, leads }: any) {
    const { t } = useTranslation('common')
    return (
        <div className="flex space-x-6">
            <div className="flex-1 bg-gray-800 p-4 rounded">
                <h3 className="text-xl font-bold mb-2">{t('dashboard.clientsPreviewTitle', 'Clients')}</h3>
                {clients.map((client: any, index: number) => (
                    <div key={index} className="border-b border-gray-700 py-1">
                        <p>{client.name}</p>
                    </div>
                ))}
            </div>
            <div className="flex-1 bg-gray-800 p-4 rounded">
                <h3 className="text-xl font-bold mb-2">{t('dashboard.leadsPreviewTitle', 'Leads')}</h3>
                {leads.map((lead: any, index: number) => (
                    <div key={index} className="border-b border-gray-700 py-1">
                        <p>{lead.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}