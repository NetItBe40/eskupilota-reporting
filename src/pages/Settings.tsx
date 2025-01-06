import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

type ApiConfig = {
  provider: string;
  api_key: string;
  client_id?: string;
  client_secret?: string;
  is_configured: boolean;
};

export default function Settings() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: configurations, refetch } = useQuery({
    queryKey: ['api-configurations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('api_configurations')
        .select('*');
      
      if (error) throw error;
      return data as ApiConfig[];
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, provider: string) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get('api_key') as string;
    const clientId = formData.get('client_id') as string;
    const clientSecret = formData.get('client_secret') as string;

    try {
      const { error } = await supabase
        .from('api_configurations')
        .upsert({
          provider,
          api_key: apiKey,
          client_id: clientId || null,
          client_secret: clientSecret || null,
          is_configured: true
        }, {
          onConflict: 'provider'
        });

      if (error) throw error;

      toast({
        title: "Configuration sauvegardée",
        description: `Les paramètres pour ${provider} ont été mis à jour.`
      });

      refetch();
    } catch (error) {
      console.error('Error saving configuration:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getConfig = (provider: string) => {
    return configurations?.find(config => config.provider === provider) || {
      provider,
      api_key: '',
      client_id: '',
      client_secret: '',
      is_configured: false
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-8 w-8" />
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        </div>

        <div className="grid gap-8">
          {/* YouTube Configuration */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">Configuration YouTube Analytics</h2>
            <form onSubmit={(e) => handleSubmit(e, 'youtube')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yt-api-key">Clé API</Label>
                <Input
                  id="yt-api-key"
                  name="api_key"
                  type="password"
                  defaultValue={getConfig('youtube').api_key}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yt-client-id">Client ID</Label>
                <Input
                  id="yt-client-id"
                  name="client_id"
                  type="password"
                  defaultValue={getConfig('youtube').client_id}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yt-client-secret">Client Secret</Label>
                <Input
                  id="yt-client-secret"
                  name="client_secret"
                  type="password"
                  defaultValue={getConfig('youtube').client_secret}
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Sauvegarder
              </Button>
            </form>
          </div>

          {/* Facebook Configuration */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">Configuration Facebook Analytics</h2>
            <form onSubmit={(e) => handleSubmit(e, 'facebook')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fb-api-key">Clé API</Label>
                <Input
                  id="fb-api-key"
                  name="api_key"
                  type="password"
                  defaultValue={getConfig('facebook').api_key}
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Sauvegarder
              </Button>
            </form>
          </div>

          {/* Instagram Configuration */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">Configuration Instagram Analytics</h2>
            <form onSubmit={(e) => handleSubmit(e, 'instagram')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ig-api-key">Clé API</Label>
                <Input
                  id="ig-api-key"
                  name="api_key"
                  type="password"
                  defaultValue={getConfig('instagram').api_key}
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Sauvegarder
              </Button>
            </form>
          </div>

          {/* Matomo Configuration */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">Configuration Matomo Analytics</h2>
            <form onSubmit={(e) => handleSubmit(e, 'matomo')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="matomo-api-key">Clé API</Label>
                <Input
                  id="matomo-api-key"
                  name="api_key"
                  type="password"
                  defaultValue={getConfig('matomo').api_key}
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Sauvegarder
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}